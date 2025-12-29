'use client';

import { useState, useEffect, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function MessageInput({ onSend, disabled = false }: MessageInputProps) {
  const [input, setInput] = useState('');
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Detect if device supports touch (mobile/tablet)
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
  }, []);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // On touch devices (mobile), allow Enter to create new line
      // On desktop, Enter sends the message
      if (!isTouchDevice) {
        e.preventDefault();
        handleSend();
      }
    }
  };

  return (
    <div className="border-t border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-3 xs:p-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] xs:pb-[calc(1rem+env(safe-area-inset-bottom))]">
      <style jsx>{`
        textarea.chat-input::-webkit-scrollbar {
          width: 14px;
        }
        textarea.chat-input::-webkit-scrollbar-track {
          background: transparent;
        }
        textarea.chat-input::-webkit-scrollbar-thumb {
          background: transparent;
        }
        textarea.chat-input::-webkit-scrollbar-button {
          display: none;
        }
        /* Only show scrollbar when content overflows - Pug themed colors */
        textarea.chat-input[data-scrollable="true"]::-webkit-scrollbar-track {
          background: #F5E6D3 !important; /* pug-cream */
          border-radius: 7px;
          margin: 2px;
        }
        :global(.dark) textarea.chat-input[data-scrollable="true"]::-webkit-scrollbar-track {
          background: rgba(160, 137, 104, 0.15) !important; /* pug-brown-medium with opacity */
        }
        textarea.chat-input[data-scrollable="true"]::-webkit-scrollbar-thumb {
          background: #C77A4E !important; /* pug-fawn (orange) */
          border-radius: 7px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        :global(.dark) textarea.chat-input[data-scrollable="true"]::-webkit-scrollbar-thumb {
          background: #D4A574 !important; /* pug-fawn-light */
          border: 2px solid transparent;
          background-clip: padding-box;
        }
      `}</style>
      <div className="max-w-4xl mx-auto flex gap-2 xs:gap-3 items-end">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Whiskey anything... 🐕"
          disabled={disabled}
          rows={1}
          className="chat-input flex-1 resize-none rounded-xl px-3 xs:px-4 py-3 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border text-light-text dark:text-dark-text placeholder:text-light-text-secondary dark:placeholder:text-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-pug-fawn dark:focus:ring-pug-fawn-light disabled:opacity-50 disabled:cursor-not-allowed max-h-30 overflow-y-auto text-base"
          style={{
            minHeight: '48px',
            height: 'auto',
          }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
            // Cap height at 120px (max-h-30)
            const newHeight = Math.min(target.scrollHeight, 120);
            target.style.height = newHeight + 'px';
            // Show scrollbar only when content overflows
            if (target.scrollHeight > 120) {
              target.setAttribute('data-scrollable', 'true');
            } else {
              target.removeAttribute('data-scrollable');
            }
          }}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="shrink-0 w-12 h-12 min-w-[48px] min-h-[48px] rounded-xl bg-pug-fawn dark:bg-pug-fawn-light text-white flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          <Send size={20} />
        </motion.button>
      </div>

      {/* Hint text - only shown on non-touch devices */}
      <div
        suppressHydrationWarning
        className="hidden xs:block max-w-4xl mx-auto mt-2 text-xs text-light-text-secondary dark:text-dark-text-secondary px-1"
        style={{ display: !mounted || isTouchDevice ? 'none' : undefined }}
      >
        Press Enter to send, Shift+Enter for new line
      </div>
    </div>
  );
}
