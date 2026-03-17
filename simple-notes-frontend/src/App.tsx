import { useState, useEffect } from 'react'
import { TopBar } from './components/TopBar'
import { MobileFAB } from './components/MobileFAB'
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
      <TopBar
        notesCount={notes.length}
        showForm={showForm}
        onToggleForm={() => setShowForm(v => !v)}
      />

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

      {/* ── Mobile FAB ── */}
      <MobileFAB
        showForm={showForm}
        onToggleForm={() => setShowForm(v => !v)}
      />
    </div>
  )
}
