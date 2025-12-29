'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export function StorageWarningBanner() {
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    // Check if user has seen the warning
    const hasSeenWarning = localStorage.getItem('whiskey_seen_storage_warning');
    setIsDismissed(hasSeenWarning === 'true');
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('whiskey_seen_storage_warning', 'true');
    setIsDismissed(true);
  };

  if (isDismissed) return null;

  return (
    <div className="bg-light-surface dark:bg-dark-surface border-l-4 border-pug-fawn p-3 flex items-start gap-3">
      <div className="flex-1 text-sm">
        <p className="font-medium text-light-text dark:text-dark-text">
          🐶 Your chats are saved in your browser only
        </p>
        <p className="text-light-text/70 dark:text-dark-text/70 text-xs mt-1">
          Your conversations stay private on your device. They won't sync across browsers or devices.
          If you clear your browser data, they'll be gone forever! *sad pug noises*
        </p>
      </div>
      <button
        onClick={handleDismiss}
        className="text-light-text/50 hover:text-light-text dark:text-dark-text/50 dark:hover:text-dark-text transition-colors"
        aria-label="Dismiss"
      >
        <X size={18} />
      </button>
    </div>
  );
}
