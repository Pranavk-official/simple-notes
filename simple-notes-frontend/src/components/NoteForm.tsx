import { useRef, useEffect, useState } from 'react'
import { RiSaveLine, RiLoader4Line } from 'react-icons/ri'

interface NoteFormProps {
  onSave: (title: string, content: string) => Promise<void>
  onCancel: () => void
}

export function NoteForm({ onSave, onCancel }: NoteFormProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)
  const titleRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Small delay lets the slide-down animation start before focus
    const t = setTimeout(() => titleRef.current?.focus(), 60)
    return () => clearTimeout(t)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || saving) return
    setSaving(true)
    try {
      await onSave(title.trim(), content.trim())
    } finally {
      setSaving(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="note-form mb-5 bg-neutral-900 border border-violet-500/40 rounded-2xl p-4 flex flex-col gap-3 shadow-lg shadow-violet-950/30"
    >
      <input
        ref={titleRef}
        type="text"
        placeholder="Note title…"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="bg-neutral-800 border border-neutral-700 focus:border-violet-500 rounded-lg px-3 py-2 text-sm text-neutral-100 placeholder-neutral-500 outline-none transition-colors duration-150"
        required
      />
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={4}
        className="bg-neutral-800 border border-neutral-700 focus:border-violet-500 rounded-lg px-3 py-2 text-sm text-neutral-100 placeholder-neutral-500 outline-none resize-none transition-colors duration-150"
      />
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-neutral-400 hover:text-neutral-200 px-3 py-1.5 rounded-lg transition-colors duration-150"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving || !title.trim()}
          className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all duration-150 text-white text-sm font-medium px-4 py-1.5 rounded-lg"
        >
          {saving ? (
            <RiLoader4Line className="text-base animate-spin" />
          ) : (
            <RiSaveLine className="text-base" />
          )}
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </form>
  )
}
