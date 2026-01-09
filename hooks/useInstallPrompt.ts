import { useEffect } from 'react';
import { useInstallPromptStore } from '@/stores/installPromptStore';
import { BeforeInstallPromptEvent } from '@/types/pwa';

export function useInstallPrompt() {
  const { canInstall, isInstalled, triggerInstall, setDeferredPrompt, checkInstallation } =
    useInstallPromptStore();

  useEffect(() => {
    // Check installation status on mount
    checkInstallation();

    // Listen for the beforeinstallprompt event
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Listen for successful installation
    const installedHandler = () => {
      checkInstallation();
    };

    window.addEventListener('appinstalled', installedHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', installedHandler);
    };
  }, [setDeferredPrompt, checkInstallation]);

  return {
    canInstall,
    isInstalled,
    triggerInstall,
  };
}
