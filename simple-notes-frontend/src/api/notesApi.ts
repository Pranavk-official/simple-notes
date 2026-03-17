// Centralised API client — all backend communication goes through here

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

export interface Note {
  id: number
  title: string
  content: string
  created_at: string
}

export interface NoteCreate {
  title: string
  content: string
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText)
    throw new Error(msg || `Request failed: ${res.status}`)
  }
  // 204 No Content — return void cast
  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

export const notesApi = {
  list: () => request<Note[]>('/notes'),

  create: (body: NoteCreate) =>
    request<Note>('/notes', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  delete: (id: number) =>
    request<void>(`/notes/${id}`, { method: 'DELETE' }),
}
