import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeminiRequest, GeminiResponse, ConversationMessage } from '@/types/gemini';
import { WHISKEY_SYSTEM_PROMPT } from './whiskeyPrompt';

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');

// Use Gemini 2.5 Flash (free tier)
const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
  systemInstruction: WHISKEY_SYSTEM_PROMPT,
});

/**
 * Generate Whiskey's AI-powered response using Gemini
 */
export async function generateWhiskeyResponse(
  request: GeminiRequest
): Promise<GeminiResponse> {
  try {
    // Conversation history is already in Gemini format from the API route
    const history: ConversationMessage[] = request.conversationHistory;

    // Create chat session with history
    const chat = model.startChat({
      history,
      generationConfig: {
        maxOutputTokens: 500, // Keep responses concise
        temperature: 1.2, // Higher creativity for pug personality
        topP: 0.95,
        topK: 40,
      },
    });

    // Build context-aware prompt
    const contextPrompt = buildContextPrompt(request);

    // Send message
    const result = await chat.sendMessage(contextPrompt);
    const responseText = result.response.text();

    // Parse response and extract mood
    return parseWhiskeyResponse(responseText);
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}

/**
 * Build context-aware prompt with time of day and conversation depth
 */
function buildContextPrompt(request: GeminiRequest): string {
  const { userMessage, context } = request;

  let prompt = '';

  // Add time context
  prompt += `[Current time of day: ${context.timeOfDay}]\n`;

  // Add conversation depth context
  if (context.messageCount === 1) {
    prompt += `[This is your first interaction with this user - be extra friendly!]\n`;
  } else if (context.messageCount > 10) {
    prompt += `[You've been chatting for a while - you're best friends now!]\n`;
  }

  // Add previous topics if available
  if (context.previousTopics.length > 0) {
    prompt += `[Topics discussed: ${context.previousTopics.slice(0, 3).join(', ')}]\n`;
  }

  prompt += `\n${userMessage}`;

  return prompt;
}

/**
 * Parse Whiskey's response and extract mood tag
 */
function parseWhiskeyResponse(responseText: string): GeminiResponse {
  // Extract mood from response (format: [MOOD:excited])
  const moodMatch = responseText.match(/\[MOOD:(.*?)\]/);
  let mood = moodMatch ? moodMatch[1].trim() : 'normal';

  // Validate mood
  const validMoods = ['normal', 'thinking', 'excited', 'sleeping', 'confused', 'alert', 'zoomies'];
  if (!validMoods.includes(mood)) {
    mood = 'normal';
  }

  // Remove mood tag from content
  const content = responseText.replace(/\[MOOD:.*?\]/g, '').trim();

  return {
    content,
    mood: mood as GeminiResponse['mood'],
  };
}

/**
 * Rate limiting helper for free tier protection
 * Free tier: 15 requests per minute
 */
let requestCount = 0;
let resetTime = Date.now() + 60000;

export function checkRateLimit(): { allowed: boolean; resetIn?: number } {
  const now = Date.now();

  // Reset counter every minute
  if (now > resetTime) {
    requestCount = 0;
    resetTime = now + 60000;
  }

  // Check if limit exceeded
  if (requestCount >= 15) {
    return { allowed: false, resetIn: resetTime - now };
  }

  requestCount++;
  return { allowed: true };
}

/**
 * Reset rate limit counter (for testing or manual reset)
 */
export function resetRateLimit(): void {
  requestCount = 0;
  resetTime = Date.now() + 60000;
}
