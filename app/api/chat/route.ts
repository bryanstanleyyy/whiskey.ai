import { NextRequest, NextResponse } from 'next/server';
import { generateWhiskeyResponse } from '@/lib/ai/groqClient';
import { GeminiRequest } from '@/types/gemini';
import { Message } from '@/types/chat';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { userMessage, conversationHistory, context } = body as {
      userMessage: string;
      conversationHistory: Message[];
      context: {
        timeOfDay: string;
        messageCount: number;
        previousTopics: string[];
      };
    };

    // Validate input
    if (!userMessage || userMessage.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message cannot be empty' },
        { status: 400 }
      );
    }

    // Format conversation history for Groq (OpenAI format)
    const geminiHistory = conversationHistory.slice(-10).map(msg => ({
      role: msg.role,
      content: msg.content,
    }));

    // Build request
    const geminiRequest: GeminiRequest = {
      userMessage,
      conversationHistory: geminiHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      })),
      context: {
        timeOfDay: context.timeOfDay as 'morning' | 'afternoon' | 'evening' | 'night',
        messageCount: context.messageCount,
        previousTopics: context.previousTopics,
      },
    };

    // Generate response from Groq
    const response = await generateWhiskeyResponse(geminiRequest);

    return NextResponse.json({
      content: response.content,
      mood: response.mood,
      pugFact: response.pugFact,
    });
  } catch (error: unknown) {
    console.error('API Route Error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    // Check for rate limit error from Groq
    if (errorMessage.includes('Rate limit exceeded')) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          fallbackResponse: {
            content: "*panting heavily* Okay okay, too many questions! *overwhelmed* My pug brain needs a break! Can we slow down a bit? Maybe... *yawns* ...take a nap? Try again in a minute! 😴",
            mood: 'sleeping',
          },
        },
        { status: 429 }
      );
    }

    // Check if it's an API key error
    if (errorMessage.includes('API key') || errorMessage.includes('API_KEY')) {
      return NextResponse.json(
        {
          error: 'API configuration error',
          fallbackResponse: {
            content: "*confused* Something's wrong with my brain connection! *whimpers* The technical humans need to check my API key! Try again later? 😕",
            mood: 'confused',
          },
        },
        { status: 500 }
      );
    }

    // Generic error fallback
    return NextResponse.json(
      {
        error: 'Internal server error',
        fallbackResponse: {
          content: "*system malfunction* Uh oh! My pug brain short-circuited! *shakes head* Everything is fuzzy! Try asking again? *hopeful tail wag* 🤔",
          mood: 'confused',
        },
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'Whiskey AI Chat API',
    version: '2.0.0',
    message: '*tail wagging* Woof! API is working! 🐕',
  });
}
