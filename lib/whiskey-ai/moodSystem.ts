import { TimeOfDay, PugMood } from '@/types/chat';
import { MOOD_PREFIXES } from './responseBank';

export function getTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 22) return 'evening';
  return 'night';
}

export function getMoodPrefix(timeOfDay: TimeOfDay): string {
  const prefixes = MOOD_PREFIXES[timeOfDay];
  if (!prefixes || prefixes.length === 0) return '';

  return prefixes[Math.floor(Math.random() * prefixes.length)];
}

export function getBaseMoodForTime(timeOfDay: TimeOfDay): PugMood {
  switch (timeOfDay) {
    case 'morning':
      return 'sleeping';
    case 'afternoon':
      return 'normal';
    case 'evening':
      return 'normal';
    case 'night':
      return 'alert';
    default:
      return 'normal';
  }
}

// Determine if we should add a mood prefix based on time and randomness
export function shouldAddMoodPrefix(timeOfDay: TimeOfDay): boolean {
  // Higher chance for morning and night moods
  if (timeOfDay === 'morning') return Math.random() < 0.6;
  if (timeOfDay === 'night') return Math.random() < 0.5;
  // Lower chance for afternoon/evening
  return Math.random() < 0.2;
}

// Occasionally inject personality quirks
export function getRandomQuirk(): string | null {
  const quirks = [
    '*pauses to sneeze* ',
    '*scratches ear* ',
    '*yawns mid-thought* ',
    '*gets distracted by own tail* ',
    '*snorts loudly* ',
    '*adjusts position* ',
    '*stretches* ',
    '*sniffs air suspiciously* ',
  ];

  // 15% chance of quirk
  if (Math.random() < 0.15) {
    return quirks[Math.floor(Math.random() * quirks.length)];
  }

  return null;
}

// Determine conversational relationship level based on message count
export function getRelationshipLevel(messageCount: number): 'stranger' | 'acquaintance' | 'friend' | 'best_friend' {
  if (messageCount < 3) return 'stranger';
  if (messageCount < 8) return 'acquaintance';
  if (messageCount < 15) return 'friend';
  return 'best_friend';
}

// Get relationship-appropriate greeting/modifier
export function getRelationshipModifier(messageCount: number): string {
  const level = getRelationshipLevel(messageCount);

  const modifiers = {
    stranger: ['*sniff sniff* You seem nice! ', '*cautiously optimistic* ', ''],
    acquaintance: ['*tail wag* Oh, you again! ', '*remembers you* ', ''],
    friend: ['*excited to see you* ', '*brings favorite toy* ', 'My friend! '],
    best_friend: [
      '*ZOOMIES* MY FAVORITE HUMAN! ',
      '*absolutely overjoyed* ',
      '*can barely contain excitement* ',
      '*jumps up and down* BEST FRIEND! ',
    ],
  };

  const options = modifiers[level];
  return options[Math.floor(Math.random() * options.length)];
}
