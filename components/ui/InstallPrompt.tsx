'use client';

import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if already installed or dismissed
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
    const isDismissed = localStorage.getItem('whiskey_install_dismissed') === 'true';

    if (isInstalled || isDismissed) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show prompt after 30 seconds of usage
      setTimeout(() => setShowPrompt(true), 30000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('PWA installed');
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('whiskey_install_dismissed', 'true');
    setShowPrompt(false);
  };

  return (
    <AnimatePresence>
      {showPrompt && deferredPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 xs:left-auto xs:right-4 xs:max-w-sm z-50"
        >
          <div className="bg-light-surface dark:bg-dark-surface border-2 border-pug-fawn dark:border-pug-fawn-light rounded-xl shadow-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-pug-fawn/10 dark:bg-pug-fawn-light/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🐶</span>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-light-text dark:text-dark-text mb-1">
                  Install Whiskey.ai
                </h3>
                <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mb-3">
                  Add to your home screen for quick access and a better experience!
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={handleInstall}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-pug-fawn dark:bg-pug-fawn-light text-white dark:text-pug-black rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    <Download size={16} />
                    Install
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="px-3 py-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text rounded-lg text-sm transition-colors"
                  >
                    Not now
                  </button>
                </div>
              </div>

              <button
                onClick={handleDismiss}
                className="flex-shrink-0 p-1 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text rounded transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
