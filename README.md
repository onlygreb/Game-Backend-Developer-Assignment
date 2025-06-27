# Game Backend Developer Assignment

## Features

- **Admin UI** (`/admin`): React + Vite dashboard to list, add, edit, delete games.
- **Backend API** (`/functions`): Express endpoints deployed as Firebase HTTP Functions under `/api/v1/games`.
- **Firestore Emulator**: Local Firestore emulator seeded with sample data via a script.
- **Containerized Testing**: Dockerfile & docker-compose.yml to spin up emulators and serve the built Admin UI.

---

## Prerequisites

- Node.js v18+
- npm
- Docker & Docker Compose
- (Optional, for local emulators) Firebase CLI (`npm install -g firebase-tools`)

---

## Getting Started

### Clone repository

```bash
git clone https://github.com/onlygreb/Game-Backend-Developer-Assignment.git
cd Game-Backend-Developer-Assignment
npm install
```

### Available root scripts

Run these from the repo root:

| Script          | Command                     | Description                                          |
| --------------- | --------------------------- | ---------------------------------------------------- |
| **Lint**        | `npm run lint`              | Lint all workspaces (`admin`, `functions`)           |
| **Format**      | `npm run format`            | Prettier format all files                            |
| **Build Image** | `npm run docker:buildImage` | Build Docker image for emulators + Admin + Functions |
| **Seed**        | `npm run seed`              | Seed Firestore emulator with sample games            |
| **Start**       | `npm run docker:start`      | Start emulators & serve Admin UI via Docker Compose  |

---

## Local Development (No Docker)

#### Admin UI

```bash
cd admin
npm install
npm run dev        # starts Vite on http://localhost:5173
```

#### Functions & Firestore Emulators

```bash
cd functions
npm install
npm run build      # compile TypeScript
firebase emulators:start --only hosting,functions,firestore
```

#### Seed Firestore

In a new terminal, once emulators are running:

```bash
cd functions
npm run seed       # loads games.json into emulator
```

Visit:

- Admin UI: [http://localhost:5173](http://localhost:5173)
- Emulator UI: [http://localhost:4000](http://localhost:4000) (default Emulator UI port)

---

## Dockerized Testing

This project can launch a container with:

- Firebase Hosting emulator serving built Admin UI
- Functions emulator
- Firestore emulator

```bash
npm run docker:buildImage   # builds Docker image
npm run docker:start        # docker-compose up
```

Once up, visit:

- Admin UI (Hosting emulator): [http://localhost:5002](http://localhost:5002)
- Emulator Dashboard (UI): [http://localhost:5000](http://localhost:5000)
- Firestore UI: [http://localhost:5000/firestore](http://localhost:5000/firestore)

Seed the database:

```bash
npm run seed         # runs seed script inside functions workspace
```

---

## Notes

- The Admin UI in Docker uses relative `/api/v1` paths and is served by the Hosting emulator.
- Local dev uses `VITE_API_URL` to target the Functions emulator.
- CORS is configured in `functions/src/app.ts` to allow requests from the Admin origin.

---
