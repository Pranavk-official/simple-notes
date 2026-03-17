# simple-notes-backend

FastAPI REST backend for Smart Notes, backed by PostgreSQL (via Docker) or SQLite (local fallback).

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/notes` | Return all notes, newest first |
| `POST` | `/notes` | Create a note — body: `{ title, content }` |
| `DELETE` | `/notes/{id}` | Delete a note by ID |

Interactive docs available at **<http://localhost:8000/docs>** when the server is running.

## Project Structure

```
simple-notes-backend/
├── main.py        # FastAPI app: CORS, lifespan, route handlers
├── database.py    # SQLAlchemy engine, SessionLocal, Base, get_db()
├── models.py      # Note ORM model (id, title, content, created_at)
├── schemas.py     # Pydantic schemas: NoteCreate, NoteResponse
├── pyproject.toml # uv project manifest & dependencies
└── .env.example   # Environment variable template
```

## Setup

### Prerequisites

- Python 3.12+
- [`uv`](https://docs.astral.sh/uv/) — fast Python package manager
- PostgreSQL (via Docker Compose in the root) **or** nothing (SQLite fallback)

### 1. Configure environment

```bash
cp .env.example .env
```

```env
# .env

# Option A — PostgreSQL (Docker running)
DATABASE_URL=postgresql://postgres:changeme@localhost:5432/simplenotes

# Option B — SQLite (no Docker needed; leave DATABASE_URL unset or use:)
# DATABASE_URL=sqlite:///./notes.db
```

### 2. Install dependencies

```bash
uv sync
```

### 3. Run the server

```bash
uvicorn main:app --reload
```

Server starts at **<http://localhost:8000>**.

## Architecture Notes

- **Dependency Injection** — every route receives a `db: Session` via `Depends(get_db)`.
- **Auto-migration** — `Base.metadata.create_all()` is called inside the FastAPI `lifespan` hook; the `notes` table is created automatically on first boot.
- **SQLite fallback** — when `DATABASE_URL` is not set, the app defaults to `sqlite:///./notes.db` so you can develop without Docker.
- **CORS** — `localhost:5173` (Vite dev server) is whitelisted.
