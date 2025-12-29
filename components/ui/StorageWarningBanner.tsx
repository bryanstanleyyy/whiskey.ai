'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export function StorageWarningBanner() {
  const [isDismissed, setIsDismissed] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user has seen the warning
    const hasSeenWarning = localStorage.getItem('whiskey_seen_storage_warning');
    setIsDismissed(hasSeenWarning === 'true');
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('whiskey_seen_storage_warning', 'true');
    setIsDismissed(true);
  };

  // Always render but hide with style to prevent hydration mismatch
  return (
    <div
      suppressHydrationWarning
      style={{ display: !mounted || isDismissed ? 'none' : undefined }}
    >
    <div className="bg-light-surface dark:bg-dark-surface border-l-4 border-pug-fawn p-2 xs:p-3 flex items-start gap-2 xs:gap-3">
      <div className="flex-1 text-xs xs:text-sm">
        <p className="font-medium text-light-text dark:text-dark-text">
          <span className="hidden xs:inline">🐶 Your chats are saved in your browser only</span>
          <span className="xs:hidden">🐶 Saved locally only</span>
        </p>
        <p className="text-light-text/70 dark:text-dark-text/70 text-[10px] xs:text-xs mt-1">
          <span className="hidden xs:inline">
            Your conversations stay private on your device. They won&apos;t sync across browsers or devices.
            If you clear your browser data, they&apos;ll be gone forever! *sad pug noises*
          </span>
          <span className="xs:hidden">
            Private & local. Clear browser data = lost chats! *sad pug noises*
          </span>
        </p>
      </div>
      <button
        onClick={handleDismiss}
        className="text-light-text/50 hover:text-light-text dark:text-dark-text/50 dark:hover:text-dark-text transition-colors p-1 -m-1"
        aria-label="Dismiss"
      >
        <X size={16} className="xs:w-[18px] xs:h-[18px]" />
      </button>
    </div>
    </div>
  );
}
