import { RiStickyNoteLine, RiCloseLine, RiAddLine } from 'react-icons/ri'

interface TopBarProps {
  notesCount: number
  showForm: boolean
  onToggleForm: () => void
}

export function TopBar({ notesCount, showForm, onToggleForm }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <RiStickyNoteLine className="text-violet-400 text-xl" />
        <span className="font-semibold text-base tracking-tight">Smart Notes</span>
        {notesCount > 0 && (
          <span className="text-xs text-neutral-500 bg-neutral-800 px-1.5 py-0.5 rounded-full">
            {notesCount}
          </span>
        )}
      </div>
      {/* Desktop-only header button */}
      <button
        onClick={onToggleForm}
        aria-label={showForm ? 'Close form' : 'New note'}
        className="hidden sm:flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 active:scale-95 transition-all duration-150 text-white text-sm font-medium px-3 py-1.5 rounded-lg"
      >
        {showForm ? <RiCloseLine className="text-base" /> : <RiAddLine className="text-base" />}
        {showForm ? 'Cancel' : 'New Note'}
      </button>
    </header>
  )
}
