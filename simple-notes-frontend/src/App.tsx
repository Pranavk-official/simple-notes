import { useState, useEffect } from 'react'
import { RiAddLine, RiStickyNoteLine, RiCloseLine } from 'react-icons/ri'
import { notesApi, type Note } from './api/notesApi'
import { NoteCard } from './components/NoteCard'
import { NoteForm } from './components/NoteForm'
import { EmptyState } from './components/EmptyState'
import { ErrorBanner } from './components/ErrorBanner'
import { SkeletonGrid } from './components/SkeletonGrid'
import './index.css'

export default function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  async function loadNotes() {
    try {
      setError(null)
      const data = await notesApi.list()
      setNotes(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load notes. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadNotes() }, [])

  async function handleCreate(title: string, content: string) {
    try {
      const note = await notesApi.create({ title, content })
      setNotes(prev => [note, ...prev])
      setShowForm(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create note.')
    }
  }

  async function handleDelete(id: number) {
    setDeletingId(id)
    try {
      await notesApi.delete(id)
      setNotes(prev => prev.filter(n => n.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete note.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      {/* ── Top bar ── */}
      <header className="sticky top-0 z-30 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <RiStickyNoteLine className="text-violet-400 text-xl" />
          <span className="font-semibold text-base tracking-tight">Smart Notes</span>
          {notes.length > 0 && (
            <span className="text-xs text-neutral-500 bg-neutral-800 px-1.5 py-0.5 rounded-full">
              {notes.length}
            </span>
          )}
        </div>
        <button
          onClick={() => setShowForm(v => !v)}
          aria-label={showForm ? 'Close form' : 'New note'}
          className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 active:scale-95 transition-all duration-150 text-white text-sm font-medium px-3 py-1.5 rounded-lg"
        >
          {showForm
            ? <RiCloseLine className="text-base" />
            : <RiAddLine className="text-base" />}
          {showForm ? 'Cancel' : 'New Note'}
        </button>
      </header>

      {/* ── Main ── */}
      <main className="flex-1 px-4 py-5 max-w-3xl w-full mx-auto">
        {/* Slide-down form */}
        {showForm && (
          <NoteForm onSave={handleCreate} onCancel={() => setShowForm(false)} />
        )}

        {/* Error */}
        {error && (
          <ErrorBanner message={error} onDismiss={() => setError(null)} />
        )}

        {/* Loading */}
        {loading && <SkeletonGrid />}

        {/* Empty */}
        {!loading && !error && notes.length === 0 && <EmptyState />}

        {/* Notes grid */}
        {!loading && notes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {notes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={handleDelete}
                isDeleting={deletingId === note.id}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
