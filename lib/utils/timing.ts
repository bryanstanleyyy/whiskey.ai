import { PugMood } from '@/types/chat';

/**
 * Calculate realistic typing delay based on response characteristics
 */
export function calculateTypingDelay(responseLength: number, mood: PugMood): number {
  const baseDelay = 800; // Minimum delay (ms)
  const charDelay = responseLength * 20; // 20ms per character

  // Mood affects typing speed
  const moodMultipliers: Record<PugMood, number> = {
    normal: 1.0,
    thinking: 1.2,
    excited: 0.6,      // Fast when excited!
    sleeping: 2.0,     // Very slow when sleepy
    confused: 1.1,
    alert: 0.9,
    zoomies: 0.4,      // SUPER FAST during zoomies!
  };

  const moodMultiplier = moodMultipliers[mood] || 1.0;

  // Random "distraction" chance - 15% chance of extra delay
  const distractionDelay = Math.random() > 0.85 ? 2000 : 0;

  // Calculate total delay
  const totalDelay = (baseDelay + charDelay) * moodMultiplier + distractionDelay;

  // Cap between 500ms and 8000ms
  return Math.min(Math.max(totalDelay, 500), 8000);
}

/**
 * Simulate progressive typing by chunking the response
 */
export async function simulateTyping(
  text: string,
  onChunk: (chunk: string) => void,
  chunkSize: number = 10
): Promise<void> {
  const words = text.split(' ');
  let currentChunk = '';

  for (let i = 0; i < words.length; i++) {
    currentChunk += (i > 0 ? ' ' : '') + words[i];

    // Send chunk every N words or at the end
    if ((i + 1) % chunkSize === 0 || i === words.length - 1) {
      onChunk(currentChunk);
      currentChunk = '';

      // Small delay between chunks for realism
      if (i < words.length - 1) {
        await delay(50);
      }
    }
  }
}

/**
 * Simple delay utility
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Get random "thinking" message for typing indicator
 */
export function getThinkingMessage(): string {
  const messages = [
    'Whiskey is thinking...',
    'Whiskey is sniffing out an answer...',
    'Whiskey got distracted...',
    'Whiskey is napping... wait, thinking!',
    'Whiskey is processing (slowly)...',
    'Whiskey is consulting the treat jar...',
    'Whiskey is trying very hard...',
    '*confused pug noises*',
  ];

  return messages[Math.floor(Math.random() * messages.length)];
}
