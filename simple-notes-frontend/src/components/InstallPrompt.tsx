import { useState, useEffect } from 'react';
import { MdDownload } from 'react-icons/md';

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Listen for the beforeinstallprompt event
    const handler = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // Optionally, send analytics event with outcome of user choice
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 sm:bottom-6 sm:right-6 sm:left-auto sm:translate-x-0 z-50 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-4 flex items-center justify-between gap-4 w-[90%] max-w-sm sm:w-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-neutral-100">Install App</span>
        <span className="text-xs text-neutral-400">Add to home screen</span>
      </div>
      <div className="flex items-center gap-2 ml-2">
        <button
          onClick={() => setShowPrompt(false)}
          className="px-3 py-1.5 text-xs font-medium text-neutral-400 hover:text-neutral-200 transition-colors"
        >
          Later
        </button>
        <button
          onClick={handleInstallClick}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 border border-indigo-500/30 text-xs font-medium rounded-lg transition-colors cursor-pointer"
        >
          {/* @ts-ignore */}
          <MdDownload size={14} className="shrink-0" />
          Install
        </button>
      </div>
    </div>
  );
}
