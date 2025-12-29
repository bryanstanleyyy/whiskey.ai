import Groq from 'groq-sdk';
import { WHISKEY_SYSTEM_PROMPT } from './whiskeyPrompt';
import type { GeminiRequest, GeminiResponse } from '@/types/gemini';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

// Rate limiting (Groq: 30 req/min free tier)
let requestCount = 0;
let resetTime = Date.now() + 60000;

function checkRateLimit(): { allowed: boolean; resetIn?: number } {
  const now = Date.now();

  if (now >= resetTime) {
    requestCount = 0;
    resetTime = now + 60000;
  }

  if (requestCount >= 30) {
    return { allowed: false, resetIn: resetTime - now };
  }

  requestCount++;
  return { allowed: true };
}

export async function generateWhiskeyResponse(
  request: GeminiRequest
): Promise<GeminiResponse> {
  // Check rate limit
  const rateCheck = checkRateLimit();
  if (!rateCheck.allowed) {
    throw new Error(
      `Rate limit exceeded. Try again in ${Math.ceil((rateCheck.resetIn || 0) / 1000)} seconds.`
    );
  }

  try {
    // Convert Gemini format to OpenAI format (Groq uses OpenAI spec)
    const messages = [
      {
        role: 'system' as const,
        content: WHISKEY_SYSTEM_PROMPT,
      },
      ...request.conversationHistory.map(msg => ({
        role: msg.role === 'user' ? ('user' as const) : ('assistant' as const),
        content: msg.parts[0].text,
      })),
      {
        role: 'user' as const,
        content: request.userMessage,
      },
    ];

    // Call Groq API
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile', // Fast, high-quality model (updated from deprecated 3.1)
      messages,
      temperature: 1.2, // High creativity for Whiskey's personality
      max_tokens: 500, // Keep responses concise
      top_p: 0.95,
    });

    const responseText = completion.choices[0]?.message?.content || '';

    // Parse mood tag (same as Gemini)
    const moodMatch = responseText.match(/\[MOOD:(\w+)\]/);
    const mood = moodMatch ? moodMatch[1] : 'normal';

    // Clean response (remove mood tags)
    const cleanedContent = responseText
      .replace(/\[MOOD:\w+\]/g, '')
      .trim();

    return {
      content: cleanedContent,
      mood: mood as any,
      pugFact: undefined,
      isEasterEgg: false,
    };
  } catch (error: any) {
    console.error('Groq API Error:', error);

    // Handle specific errors
    if (error?.status === 429) {
      throw new Error('Rate limit exceeded');
    }

    if (error?.message?.includes('API key')) {
      throw new Error('Invalid API key');
    }

    throw new Error('Failed to generate response');
  }
}
