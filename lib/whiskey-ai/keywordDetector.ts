import { TECHNICAL_TERMS } from './responseBank';
import { WhiskeyResponse } from '@/types/chat';

export function detectTechnicalTerms(message: string): WhiskeyResponse | null {
  // Check each technical term category
  for (const [, data] of Object.entries(TECHNICAL_TERMS)) {
    for (const keyword of data.keywords) {
      // Use word boundaries to avoid partial matches
      const regex = new RegExp(`\\b${keyword}\\b`, 'i');
      if (regex.test(message)) {
        const randomResponse = data.responses[Math.floor(Math.random() * data.responses.length)];

        return {
          content: randomResponse,
          mood: 'confused',
        };
      }
    }
  }

  return null;
}

// Detect question patterns
export function isQuestion(message: string): boolean {
  return (
    message.includes('?') ||
    /^(what|how|why|when|where|who|can|could|would|should|is|are|do|does)/i.test(message.trim())
  );
}

// Detect greeting patterns
export function isGreeting(message: string): boolean {
  const greetingPatterns = /^(hi|hello|hey|yo|sup|greetings|good morning|good afternoon|good evening)/i;
  return greetingPatterns.test(message.trim());
}

// Detect sentiment (very simple)
export function detectSentiment(message: string): 'positive' | 'negative' | 'neutral' {
  const lowerMessage = message.toLowerCase();

  const positiveWords = ['good', 'great', 'awesome', 'amazing', 'love', 'perfect', 'excellent', 'wonderful', 'fantastic', 'yes', 'thanks', 'thank you'];
  const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'no', 'stop', 'wrong', 'error', 'fail', 'broken', 'issue', 'problem'];

  let positiveCount = 0;
  let negativeCount = 0;

  positiveWords.forEach(word => {
    if (lowerMessage.includes(word)) positiveCount++;
  });

  negativeWords.forEach(word => {
    if (lowerMessage.includes(word)) negativeCount++;
  });

  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
}

// Extract topic keywords from message (for context tracking)
export function extractTopics(message: string): string[] {
  const words = message.toLowerCase().split(/\s+/);
  // Filter for meaningful words (longer than 4 characters)
  return words.filter(word => word.length > 4 && !isCommonWord(word));
}

function isCommonWord(word: string): boolean {
  const commonWords = [
    'that', 'this', 'with', 'from', 'have', 'what', 'when', 'where',
    'which', 'there', 'their', 'would', 'could', 'should', 'about',
    'other', 'these', 'those', 'some', 'many', 'much', 'very'
  ];
  return commonWords.includes(word);
}

// Detect if message is asking for help
export function isAskingForHelp(message: string): boolean {
  const helpPatterns = /\b(help|assist|support|explain|show|teach|tell)\b/i;
  return helpPatterns.test(message);
}

// Detect coding/technical intent
export function isTechnicalQuery(message: string): boolean {
  const technicalKeywords = [
    'code', 'program', 'function', 'error', 'bug', 'fix', 'build',
    'install', 'run', 'execute', 'compile', 'debug', 'test'
  ];

  const lowerMessage = message.toLowerCase();
  return technicalKeywords.some(keyword => lowerMessage.includes(keyword));
}
