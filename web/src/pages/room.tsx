import { Navigate, useParams } from 'react-router-dom';

type RoomParams = {
  id: string;
};

export function Room() {
  const params = useParams<RoomParams>();

  if (!params.id) {
    return <Navigate replace to="/" />;
  }

  return (
    <div>
      <h1 className="font-bold text-2xl">Room Details</h1>
      <p>Room ID: {params.id}</p>
    </div>
  );
}
