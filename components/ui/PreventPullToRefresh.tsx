'use client';

import { useEffect } from 'react';

/**
 * Prevents pull-to-refresh gesture on mobile devices in PWA mode only.
 * This prevents the viewport issue that occurs after pull-to-refresh on Android PWAs.
 * In regular browser mode, pull-to-refresh works normally.
 */
export function PreventPullToRefresh() {
  useEffect(() => {
    // Only apply in standalone/PWA mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                        ('standalone' in window.navigator && (window.navigator as { standalone?: boolean }).standalone === true);

    if (!isStandalone) {
      return; // Don't prevent pull-to-refresh in regular browser
    }

    // Add class to body for CSS targeting
    document.body.classList.add('pwa-mode');

    // Prevent pull-to-refresh by blocking overscroll at the document level
    const preventPullToRefresh = (e: TouchEvent) => {
      // Get the scrollable element
      const target = e.target as HTMLElement;
      const scrollableParent = getScrollableParent(target);

      // If we're at the top of the page and trying to scroll down, prevent it
      if (scrollableParent === document.body || scrollableParent === document.documentElement) {
        const isAtTop = window.scrollY === 0;

        if (isAtTop && e.touches.length === 1) {
          // Prevent the default pull-to-refresh behavior
          e.preventDefault();
        }
      }
    };

    // Helper to find scrollable parent
    const getScrollableParent = (element: HTMLElement | null): HTMLElement => {
      if (!element || element === document.body) {
        return document.body;
      }

      const { overflow, overflowY } = window.getComputedStyle(element);
      const isScrollable = /(auto|scroll)/.test(overflow + overflowY);

      if (isScrollable && element.scrollHeight > element.clientHeight) {
        return element;
      }

      return getScrollableParent(element.parentElement);
    };

    // Add listener with passive: false to allow preventDefault
    document.addEventListener('touchmove', preventPullToRefresh, { passive: false });

    return () => {
      document.removeEventListener('touchmove', preventPullToRefresh);
      document.body.classList.remove('pwa-mode');
    };
  }, []);

  return null;
}
