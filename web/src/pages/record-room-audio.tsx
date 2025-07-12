import { ArrowLeft, Pause, Play } from 'lucide-react';
import { useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type RoomParams = {
  id: string;
};

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function';

export function RecordRoomAudio() {
  const params = useParams<RoomParams>();
  const [isRecording, setIsRecording] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  if (!params.id) {
    return <Navigate replace to="/" />;
  }

  function createRecorder(audio: MediaStream) {
    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    });

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data);
      }
    };

    recorder.current.onstart = () => {
      // biome-ignore lint/suspicious/noConsole: Testing audio recording
      console.log('Gravando...');
    };

    recorder.current.onstop = () => {
      // biome-ignore lint/suspicious/noConsole: Testing audio recording
      console.log('Gravação encerrada.');
    };

    recorder.current.start();
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert('O seu navegador não suporta gravação de áudio.');
      return;
    }

    setIsRecording(true);

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    });

    createRecorder(audio);

    intervalRef.current = setInterval(() => {
      recorder.current?.stop();

      createRecorder(audio);
    }, 5000);
  }

  function stopRecording() {
    setIsRecording(false);

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop();
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData();

    formData.append('file', audio, 'audio.webm');

    const response = await fetch(
      `http://localhost:3333/rooms/${params.id}/audio`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const result = await response.json();

    // biome-ignore lint/suspicious/noConsole: Returns chunkId
    console.log(result);
  }

  return (
    <div className="mx-auto flex w-sm flex-col justify-center gap-3 py-8">
      <Link to={`/room/${params.id}`}>
        <Button variant="outline">
          <ArrowLeft className="mr-2 size-4" />
          Voltar para a sala
        </Button>
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>Gravar áudio</CardTitle>
          <CardDescription>
            Clique no botão para começar a gravar.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-3">
          {isRecording ? (
            <Button onClick={stopRecording}>
              <Pause className="size-4" />
            </Button>
          ) : (
            <Button onClick={startRecording}>
              <Play className="size-4" />
            </Button>
          )}

          {isRecording ? <p>Gravando...</p> : <p>Pausado</p>}
        </CardContent>
      </Card>
    </div>
  );
}
