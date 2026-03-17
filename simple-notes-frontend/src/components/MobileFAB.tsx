import { RiCloseLine, RiAddLine } from 'react-icons/ri'

interface MobileFABProps {
  showForm: boolean
  onToggleForm: () => void
}

export function MobileFAB({ showForm, onToggleForm }: MobileFABProps) {
  return (
    <button
      onClick={onToggleForm}
      aria-label={showForm ? 'Close form' : 'New note'}
      className="sm:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-violet-600 hover:bg-violet-500 active:scale-90 shadow-lg shadow-violet-900/50 flex items-center justify-center transition-all duration-200"
    >
      {showForm ? <RiCloseLine className="text-2xl text-white" /> : <RiAddLine className="text-2xl text-white" />}
    </button>
  )
}
