'use client';

import { motion } from 'framer-motion';
import PugAvatar from '@/components/ui/PugAvatar';
import { useEffect, useState } from 'react';
import { getThinkingMessage } from '@/lib/utils/timing';

export default function TypingIndicator() {
  const [message, setMessage] = useState(getThinkingMessage());

  // Rotate thinking messages occasionally
  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(getThinkingMessage());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex gap-3 mb-4"
    >
      <PugAvatar mood="thinking" animated />

      <div className="bg-light-whiskey-bubble dark:bg-dark-whiskey-bubble rounded-2xl px-4 py-3 flex items-center gap-2 max-w-xs">
        <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
          {message}
        </span>

        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-pug-brown dark:bg-pug-brown-medium rounded-full"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
