'use client';

import { Menu, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/ui/ThemeToggle';

interface ChatHeaderProps {
  onMenuClick?: () => void;
  onNewChat?: () => void;
}

export default function ChatHeader({ onMenuClick, onNewChat }: ChatHeaderProps) {
  return (
    <header className="border-b border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side - Menu button (mobile) */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-light-background dark:hover:bg-dark-background transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={20} className="text-light-text dark:text-dark-text" />
          </motion.button>

          {/* Logo/Title */}
          <div className="flex items-center gap-2">
            <span className="text-3xl">🐶</span>
            <div>
              <h1 className="text-xl font-bold text-light-text dark:text-dark-text">
                Whiskey.ai
              </h1>
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                Your friendly pug assistant
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          {/* New Chat button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNewChat}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-pug-fawn dark:bg-pug-fawn-light text-white dark:text-pug-black hover:opacity-90 transition-opacity"
          >
            <Plus size={16} />
            <span className="text-sm font-medium">New Chat</span>
          </motion.button>

          {/* Mobile new chat button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNewChat}
            className="sm:hidden p-2 rounded-lg bg-pug-fawn dark:bg-pug-fawn-light text-white dark:text-pug-black"
            aria-label="New chat"
          >
            <Plus size={20} />
          </motion.button>

          {/* Theme toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
