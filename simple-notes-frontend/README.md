# simple-notes-frontend

Mobile-first React frontend for Smart Notes — built with Vite, TypeScript, and Tailwind CSS v4. Communicates with the FastAPI backend through a centralised typed API client.

## Features

- 📱 **Mobile-first** — single-column on small screens, 2-column bento grid on `sm` and up
- 🎨 **Dark theme** — neutral-950 background with violet accents
- ✨ **Micro-animations** — form slides down on open, cards fade-up with stagger, error banner shakes
- 🔄 **Loading skeletons** — staggered pulse placeholders while notes are fetched
- 🗑️ **In-flight spinner** — per-card spinner replaces the delete icon while the API call is pending
- 🧩 **Component-based** — all UI is split into focused, reusable components
- 🔌 **API client layer** — `src/api/notesApi.ts` is the single place that calls `fetch()`

## Project Structure

```
simple-notes-frontend/
├── .env.example                   # Env template → copy to .env.local
├── src/
│   ├── api/
│   │   └── notesApi.ts            # Typed API client (list, create, delete)
│   ├── components/
│   │   ├── NoteCard.tsx           # Note card with delete button
│   │   ├── NoteForm.tsx           # Slide-down create form
│   │   ├── EmptyState.tsx         # Empty state illustration
│   │   ├── ErrorBanner.tsx        # Dismissable error with shake animation
│   │   └── SkeletonGrid.tsx       # Staggered loading skeletons
│   ├── App.tsx                    # State orchestration, layout, top-bar
│   └── index.css                  # Tailwind v4, Inter font, keyframe animations
├── index.html
├── vite.config.ts
└── package.json
```

## Setup

### Prerequisites

- [Bun](https://bun.sh) `1.0+` (or Node 20+ with npm/pnpm)
- Backend running at `http://localhost:8000` — see [backend README](../simple-notes-backend/README.md)

### 1. Configure environment

```bash
cp .env.example .env.local
```

```env
# .env.local
VITE_API_URL=http://localhost:8000e
```

### 2. Install dependencies

```bash
bun install
```

### 3. Run the dev server

```bash
bun run dev
# → http://localhost:5173
```

### 4. Build for production

```bash
bun run build
# Output in ./dist
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:8000` | Base URL for the FastAPI backend |

## Tech Stack

| Package | Version | Purpose |
|---------|---------|---------|
| Vite | 8 | Build tool & HMR dev server |
| React | 19 | UI framework |
| TypeScript | 5.9 | Type safety |
| Tailwind CSS | 4 | Utility-first styling |
| react-icons | 5 | SVG icon library (Remix Icons set) |
