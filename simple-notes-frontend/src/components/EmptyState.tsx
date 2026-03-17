import { RiStickyNoteLine } from 'react-icons/ri'

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-neutral-600 animate-fade-in">
      <RiStickyNoteLine className="text-5xl text-neutral-700" />
      <p className="text-sm">
        No notes yet. Hit{' '}
        <span className="text-violet-400 font-medium">+ New Note</span> to start.
      </p>
    </div>
  )
}
