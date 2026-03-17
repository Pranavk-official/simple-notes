import { RiCloseLine, RiErrorWarningLine } from 'react-icons/ri'

interface ErrorBannerProps {
  message: string
  onDismiss: () => void
}

export function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  return (
    <div className="mb-4 flex items-start gap-3 bg-red-950/60 border border-red-700/60 text-red-300 text-sm px-4 py-3 rounded-xl animate-shake">
      <RiErrorWarningLine className="text-base shrink-0 mt-0.5" />
      <span className="flex-1">{message}</span>
      <button
        onClick={onDismiss}
        aria-label="Dismiss error"
        className="text-red-400 hover:text-red-200 transition-colors shrink-0"
      >
        <RiCloseLine className="text-base" />
      </button>
    </div>
  )
}
