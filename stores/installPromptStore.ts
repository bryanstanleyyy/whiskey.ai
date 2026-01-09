import { create } from 'zustand';
import { BeforeInstallPromptEvent } from '@/types/pwa';

interface InstallPromptState {
  deferredPrompt: BeforeInstallPromptEvent | null;
  isInstalled: boolean;
  canInstall: boolean;
  setDeferredPrompt: (prompt: BeforeInstallPromptEvent | null) => void;
  checkInstallation: () => void;
  triggerInstall: () => Promise<boolean>;
}

const checkIfInstalled = (): boolean => {
  if (typeof window === 'undefined') return false;

  // Check if running in standalone mode (installed PWA)
  return window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true; // iOS Safari
};

export const useInstallPromptStore = create<InstallPromptState>((set, get) => ({
  deferredPrompt: null,
  isInstalled: checkIfInstalled(),
  canInstall: false,

  setDeferredPrompt: (prompt) =>
    set({
      deferredPrompt: prompt,
      canInstall: prompt !== null && !get().isInstalled
    }),

  checkInstallation: () => {
    const isInstalled = checkIfInstalled();
    set({
      isInstalled,
      canInstall: get().deferredPrompt !== null && !isInstalled
    });
  },

  triggerInstall: async () => {
    const { deferredPrompt } = get();

    if (!deferredPrompt) {
      return false;
    }

    try {
      // Show the install prompt
      await deferredPrompt.prompt();

      // Wait for the user to respond
      const { outcome } = await deferredPrompt.userChoice;

      // Clear the deferred prompt
      set({
        deferredPrompt: null,
        canInstall: false
      });

      if (outcome === 'accepted') {
        console.log('PWA installed successfully');
        // Check installation status after a short delay
        setTimeout(() => get().checkInstallation(), 1000);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error triggering install:', error);
      return false;
    }
  },
}));
