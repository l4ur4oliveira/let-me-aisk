# Let me AIsk

> Project developed during NLW Agents event.

Imagine an agent answering viewers' questions in chat about the content of a live stream.

## 🧩 Technologies

- **Backend:** Node.js, Fastify, Zod, Drizzle ORM, PostgreSQL
- **Frontend:** React, Vite, Tailwind CSS, shadcn/ui, React Query, React Router
- **Dev Tools:** Docker, WSL, Drizzle Kit, Biome, TypeScript

## 🛠️ Getting Started

### Prerequisites

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/) (v22+ recommended)
- [npm](https://www.npmjs.com/)

### 1. Start the backend environment

```sh
cd server
npm install
npm run services:up
```

### 2. Configure environment variables

Copy `.env.example` to `.env` in the `server` folder and edit as needed.

### 3. Run database migrations and seed

```sh
npx drizzle-kit generate
npx drizzle-kit migrate
npm run db:seed
```

### 4. Start the backend server

```sh
npm run dev
```

### 5. Start the frontend

```sh
cd ../web
npm install
npm run dev
```

## 🔗 Servers run at

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3333](http://localhost:3333)
