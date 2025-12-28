'use client';

import { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function MessageInput({ onSend, disabled = false }: MessageInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-4">
      <div className="max-w-4xl mx-auto flex gap-3 items-end">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Whiskey anything... (or just say hi! 🐕)"
          disabled={disabled}
          rows={1}
          className="flex-1 resize-none rounded-xl px-4 py-3 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border text-light-text dark:text-dark-text placeholder:text-light-text-secondary dark:placeholder:text-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-pug-fawn dark:focus:ring-pug-fawn-light disabled:opacity-50 disabled:cursor-not-allowed max-h-32 overflow-y-auto"
          style={{
            minHeight: '48px',
            height: 'auto',
          }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
            target.style.height = target.scrollHeight + 'px';
          }}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="shrink-0 w-12 h-12 rounded-xl bg-pug-fawn dark:bg-pug-fawn-light text-white flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send size={20} />
        </motion.button>
      </div>

      {/* Hint text */}
      <div className="max-w-4xl mx-auto mt-2 text-xs text-light-text-secondary dark:text-dark-text-secondary px-1">
        Press Enter to send, Shift+Enter for new line
      </div>
    </div>
  );
}
