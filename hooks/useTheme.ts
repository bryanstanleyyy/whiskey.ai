'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/stores/themeStore';

export function useTheme() {
  const { theme, toggleTheme, setTheme } = useThemeStore();

  // Apply theme class to document on mount and when theme changes
  useEffect(() => {
    const root = document.documentElement;

    // Remove both classes first
    root.classList.remove('light', 'dark');

    // Add current theme class
    root.classList.add(theme);
  }, [theme]);

  return {
    theme,
    toggleTheme,
    setTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  };
}
