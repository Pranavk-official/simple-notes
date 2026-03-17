# 📝 Smart Notes

A full-stack CRUD note-taking app with a FastAPI + PostgreSQL backend and a mobile-first React frontend, fully containerised for local development.

## Project Structure

```
simple-notes/
├── docker-compose.yml              # PostgreSQL 16 + Adminer
├── .env.example                    # Root DB credential template → copy to .env
├── .gitignore
├── simple-notes-backend/           # Python / FastAPI / SQLAlchemy
│   ├── .env.example                # Backend env template → copy to .env
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   └── pyproject.toml
└── simple-notes-frontend/          # Vite / React / TypeScript / Tailwind v4
    ├── .env.example                # Frontend env template → copy to .env.local
    ├── src/
    │   ├── api/notesApi.ts         # Typed API client
    │   ├── components/             # NoteCard, NoteForm, EmptyState, …
    │   ├── App.tsx
    │   └── index.css
    └── package.json
```

## Prerequisites

| Tool | Version | Notes |
|------|---------|-------|
| [Docker](https://docs.docker.com/get-docker/) | 24+ | For PostgreSQL + Adminer |
| [uv](https://docs.astral.sh/uv/) | latest | Python package manager |
| [Bun](https://bun.sh) | 1.0+ | Node-compatible JS runtime |
| Python | 3.12+ | Managed by uv |

## Quick Start

### 1. Clone and configure environment

```bash
git clone <repo-url>
cd simple-notes

# Root DB credentials (used by Docker Compose)
cp .env.example .env
# Edit .env — set DB_USER, DB_PASS, DB_NAME
```

### 2. Start the database

```bash
docker compose up -d
```

| Service  | URL |
|----------|-----|
| PostgreSQL | `localhost:5432` |
| Adminer (DB UI) | <http://localhost:8080> |

> **Adminer login:** Server = `db`, use the credentials from your `.env`.

### 3. Start the backend

```bash
cd simple-notes-backend
cp .env.example .env          # set DATABASE_URL
uv sync                       # install deps into .venv
uvicorn main:app --reload     # starts on http://localhost:8000
```

- API docs: <http://localhost:8000/docs>

### 4. Start the frontend

```bash
cd simple-notes-frontend
cp .env.example .env.local    # VITE_API_URL already set
bun install
bun run dev                   # starts on http://localhost:5173
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Database | PostgreSQL 16 (Docker) |
| DB Admin | Adminer |
| Backend | FastAPI 0.135 · SQLAlchemy 2 · Pydantic v2 · psycopg2 |
| Frontend | Vite 8 · React 19 · TypeScript 5.9 · Tailwind CSS v4 |
| Icons | react-icons 5 |
| Package managers | uv (Python) · Bun (JS) |

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/notes` | List all notes (newest first) |
| `POST` | `/notes` | Create a note |
| `DELETE` | `/notes/{id}` | Delete a note |
