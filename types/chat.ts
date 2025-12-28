export type MessageRole = 'user' | 'assistant';

export type PugMood = 'normal' | 'thinking' | 'excited' | 'sleeping' | 'confused' | 'alert' | 'zoomies';

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  metadata?: {
    mood?: PugMood;
    pugFact?: string;
    isEasterEgg?: boolean;
  };
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ResponseContext {
  userMessage: string;
  conversationHistory: Message[];
  timeOfDay: TimeOfDay;
  previousTopics: string[];
  messageCount: number;
}

export interface WhiskeyResponse {
  content: string;
  mood: PugMood;
  pugFact?: string;
  isEasterEgg?: boolean;
}

export interface EasterEgg {
  trigger: string | RegExp;
  type: 'instant' | 'delayed' | 'special';
  responses: string[];
  mood?: PugMood;
  specialEffect?: string;
}
