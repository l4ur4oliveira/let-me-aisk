# Let me AIsk

> Project developed during NLW Agents event.

Imagine an agent answering viewers' questions in chat about the content of a live stream.

## 🧩 Technologies

- **Backend:** Node.js, Fastify, Zod, Drizzle ORM, PostgreSQL, Google Gemini API
- **Frontend:** React, Vite, Tailwind CSS, shadcn/ui, React Query, React Router
- **Dev Tools:** Docker, WSL, Drizzle Kit, Biome, TypeScript

## 🛠️ Getting Started

### Prerequisites

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/) (v22+ recommended)
- [npm](https://www.npmjs.com/)

<details>
<summary><h3 style="display: inline;">🗄️Server</h3></summary>

### 1. Sets server environment

```sh
cd server
npm install
npm run services:up
```

### 2. Configure variables

Copy `.env.example` to `.env` in the `server` folder and edit as needed.

### 3. Sets database

```sh
npm run db:generate
npm run db:migrate
npm run db:seed
```

### 4. Start server

🔗 It runs at [http://localhost:3333](http://localhost:3333).

```sh
npm run dev
```

</details>
<details>
<summary><h3 style="display: inline;">🌐Web</h3></summary>


### 1. Start frontend server

🔗 It runs at [http://localhost:5173](http://localhost:5173).

```sh
cd ../web
npm install
npm run dev
```

</details>

## 📖 API Endpoints

### Health Check

- `GET /health`: Returns `"OK"` if the server is running.

### Rooms

- `GET /rooms`: List all rooms with their question count.

  **Response:**
  ```json
  {
    "id": "uuid",
    "name": "Room name",
    "createdAt": "AAAA-MM-DDThh:mm:ss.sssZ",
    "questionsCount": 0
  }
  ```

- `POST /rooms`: Create a new room.

  **Body:**
  ```json
  {
    "name": "Room name",
    "description": "Optional description"
  }
  ```
  **Response:**
  ```json
  { "roomId": "uuid" }
  ```

### Questions

- `GET /rooms/:roomId/questions`: List all questions and answers for a room.

  **Response:**
  ```json
  {
    "id": "uuid",
    "question": "User question",
    "answer": null,
    "createdAt": "AAAA-MM-DDThh:mm:ss.sssZ",
  }
  ```

- `POST /rooms/:roomId/questions`: Create a new question in a room and get an AI-generated answer.

  **Body:**
  ```json
  { "question": "User question" }
  ```
  **Response:**
  ```json
  {
    "questionId": "uuid",
    "answer": "AI answer or null"
  }
  ```

### Audio

- `POST /rooms/:roomId/audio`: Upload an audio file to be transcribed by AI.

  **Response:**
  ```json
  { "chunkId": "uuid" }
  ```

## 🗺️ Frontend Routes

- `/`: Create a new room and see recent rooms.

- `/room/:id`: View questions and answers for a room. Submit new questions.

- `/room/:id/audio`: Record and upload audio for the room (used as context for AI answers).
