import { ResponseContext, WhiskeyResponse } from '@/types/chat';
import { checkForEasterEgg, checkSpecialCombinations, getRandomFunFact } from './easterEggs';

/**
 * AI-POWERED Response Generator
 * Uses Google Gemini API for dynamic responses while maintaining easter eggs
 */
export async function generateResponse(context: ResponseContext): Promise<WhiskeyResponse> {
  const { userMessage, conversationHistory, timeOfDay, previousTopics, messageCount } = context;

  // LAYER 1: Check for Easter Eggs (preserve special instant responses)
  // These bypass the API for instant, consistent personality moments
  const easterEggResponse = checkForEasterEgg(userMessage);
  if (easterEggResponse) {
    return easterEggResponse; // Return immediately - no API call needed
  }

  // LAYER 1.5: Check for special combinations (also bypass API)
  const specialResponse = checkSpecialCombinations(userMessage);
  if (specialResponse) {
    return specialResponse;
  }

  // LAYER 2: Call Gemini API for AI-powered response
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userMessage,
        conversationHistory: conversationHistory.slice(-10), // Last 10 messages for context
        context: {
          timeOfDay,
          messageCount,
          previousTopics,
        },
      }),
    });

    if (!response.ok) {
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();

        // Handle rate limiting gracefully
        if (response.status === 429 && errorData.fallbackResponse) {
          return errorData.fallbackResponse;
        }

        // Handle other API errors with fallback
        if (errorData.fallbackResponse) {
          return errorData.fallbackResponse;
        }

        throw new Error(errorData.error || 'API request failed');
      } else {
        // Non-JSON error (likely HTML error page from Next.js)
        console.error(`API returned non-JSON error: ${response.status} ${response.statusText}`);
        throw new Error(`API error: ${response.status}`);
      }
    }

    const data = await response.json();

    // Check if we should add a random fun fact (5% chance)
    // Only add if one wasn't already provided by the API
    const randomFact = data.pugFact ? null : getRandomFunFact();

    return {
      content: data.content,
      mood: data.mood,
      pugFact: data.pugFact || randomFact || undefined,
    };
  } catch (error) {
    console.error('Failed to generate AI response:', error);

    // LAYER 3: Hardcoded fallback if API fails
    return getFallbackResponse('error');
  }
}

/**
 * Emergency fallback responses if AI is unavailable
 */
function getFallbackResponse(type: 'error' | 'rate_limit'): WhiskeyResponse {
  if (type === 'rate_limit') {
    return {
      content: "*panting* Whoa! So many questions! *dizzy* My pug brain is overheating! Let me catch my breath... *collapses for nap* Try again in a minute? 😴",
      mood: 'sleeping',
    };
  }

  // Error fallbacks - randomize for variety
  const fallbacks = [
    {
      content: "*system glitch* Uh oh! My brain did a weird thing! *confused head tilt* Can you ask that again? Maybe simpler? Pug-sized words? 🤔",
      mood: 'confused' as const,
    },
    {
      content: "*buffering* ...sorry, I spaced out! What were you saying? *trying to focus* I got distracted by... something. Probably a squirrel. Mental squirrel. 🐿️",
      mood: 'confused' as const,
    },
    {
      content: "*connection issues* My brain isn't braining right now! *shakes head* Give me a second to reboot! *spins in circle three times* Okay, ready! Wait, what did you ask? 🤨",
      mood: 'confused' as const,
    },
    {
      content: "*error noises* BORK! Something went wrong! *whimpers* Can we try again? I promise to focus this time! *determined tail wag* 🐕",
      mood: 'alert' as const,
    },
  ];

  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

/**
 * Calculate typing delay based on response length and mood
 * (Kept from original system for realistic typing indicators)
 */
export function getTypingDelay(responseLength: number, mood: string): number {
  const baseDelay = 800; // Minimum delay
  const charDelay = responseLength * 20; // 20ms per character
  const moodMultiplier = mood === 'sleeping' ? 1.5 : mood === 'excited' || mood === 'zoomies' ? 0.7 : 1;

  // Random "distraction" chance - occasionally add extra delay
  const distractionDelay = Math.random() > 0.85 ? 2000 : 0;

  return (baseDelay + charDelay) * moodMultiplier + distractionDelay;
}
