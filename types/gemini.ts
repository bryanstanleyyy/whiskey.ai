import { PugMood } from './chat';

export interface GeminiRequest {
  userMessage: string;
  conversationHistory: ConversationMessage[];
  context: {
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
    messageCount: number;
    previousTopics: string[];
  };
}

export interface ConversationMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface GeminiResponse {
  content: string;
  mood: PugMood;
  pugFact?: string;
}

export interface GeminiError {
  error: string;
  fallback: boolean;
}
