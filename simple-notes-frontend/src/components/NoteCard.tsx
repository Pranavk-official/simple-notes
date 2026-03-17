import { RiDeleteBin5Line } from 'react-icons/ri'
import type { Note } from '../api/notesApi'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

interface NoteCardProps {
  note: Note
  onDelete: (id: number) => void
  isDeleting: boolean
}

export function NoteCard({ note, onDelete, isDeleting }: NoteCardProps) {
  return (
    <article className="note-card group relative bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-violet-500/40 rounded-2xl p-4 flex flex-col gap-2 transition-all duration-200 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-sm font-semibold text-neutral-100 leading-snug line-clamp-2">
          {note.title}
        </h2>
        <button
          onClick={() => onDelete(note.id)}
          disabled={isDeleting}
          aria-label={`Delete note: ${note.title}`}
          className="shrink-0 text-neutral-600 hover:text-red-400 disabled:opacity-40 transition-all duration-150 active:scale-90 p-1 -m-1 rounded-lg"
        >
          {isDeleting ? (
            <span className="block w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <RiDeleteBin5Line className="text-base" />
          )}
        </button>
      </div>

      {note.content && (
        <p className="text-xs text-neutral-400 leading-relaxed line-clamp-4">
          {note.content}
        </p>
      )}

      <span className="mt-auto pt-2 text-xs text-neutral-600 border-t border-neutral-800">
        {formatDate(note.created_at)}
      </span>
    </article>
  )
}
