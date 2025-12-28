'use client';

import { PugMood } from '@/types/chat';
import { motion } from 'framer-motion';

interface PugAvatarProps {
  mood?: PugMood;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function PugAvatar({ mood = 'normal', animated = false, size = 'md' }: PugAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-2xl',
    md: 'w-10 h-10 text-3xl',
    lg: 'w-16 h-16 text-5xl',
  };

  // Different emojis/expressions for different moods
  const moodEmojis: Record<PugMood, string> = {
    normal: '🐶',
    thinking: '🤔',
    excited: '🐕',
    sleeping: '😴',
    confused: '🤨',
    alert: '👀',
    zoomies: '💨',
  };

  const emoji = moodEmojis[mood] || '🐶';

  // Animation variants based on mood
  const animations = {
    normal: {},
    thinking: {
      rotate: [0, -5, 5, -5, 0],
      transition: { repeat: Infinity, duration: 2 },
    },
    excited: {
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0],
      transition: { repeat: Infinity, duration: 0.6 },
    },
    sleeping: {
      y: [0, -2, 0],
      transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
    },
    confused: {
      rotate: [0, 15, -15, 15, 0],
      transition: { repeat: Infinity, duration: 3 },
    },
    alert: {
      scale: [1, 1.05, 1],
      transition: { repeat: Infinity, duration: 0.5 },
    },
    zoomies: {
      rotate: [0, 360],
      scale: [1, 1.2, 1],
      transition: { repeat: Infinity, duration: 1 },
    },
  };

  return (
    <motion.div
      className={`flex items-center justify-center rounded-full bg-pug-fawn dark:bg-pug-fawn-light ${sizeClasses[size]} shrink-0`}
      animate={animated ? animations[mood] : {}}
    >
      <span className="select-none" role="img" aria-label={`Pug ${mood}`}>
        {emoji}
      </span>
    </motion.div>
  );
}
