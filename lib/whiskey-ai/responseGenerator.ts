import { ResponseContext, WhiskeyResponse } from '@/types/chat';
import { checkForEasterEgg, checkSpecialCombinations } from './easterEggs';
import {
  detectTechnicalTerms,
  isQuestion,
  isGreeting,
  detectSentiment,
  isTechnicalQuery,
} from './keywordDetector';
import {
  getTimeOfDay,
  getMoodPrefix,
  getBaseMoodForTime,
  shouldAddMoodPrefix,
  getRandomQuirk,
  getRelationshipModifier,
} from './moodSystem';
import { CASUAL_RESPONSES, FOLLOW_UPS } from './responseBank';

/**
 * Main response generation function - this is the brain of Whiskey!
 * Processes user input through multiple layers to generate an adorably confused pug response
 */
export async function generateResponse(context: ResponseContext): Promise<WhiskeyResponse> {
  const { userMessage, messageCount } = context;

  // Layer 1: Check for Easter Eggs (highest priority)
  const easterEggResponse = checkForEasterEgg(userMessage);
  if (easterEggResponse) {
    return enhanceResponse(easterEggResponse, context);
  }

  // Layer 1.5: Check for special combinations
  const specialResponse = checkSpecialCombinations(userMessage);
  if (specialResponse) {
    return enhanceResponse(specialResponse, context);
  }

  // Layer 2: Check for technical terms (pug misinterpretations)
  const technicalResponse = detectTechnicalTerms(userMessage);
  if (technicalResponse) {
    return enhanceResponse(technicalResponse, context);
  }

  // Layer 3: Pattern-based responses
  if (isGreeting(userMessage)) {
    return enhanceResponse(generateGreetingResponse(messageCount), context);
  }

  if (isQuestion(userMessage)) {
    return enhanceResponse(generateQuestionResponse(userMessage, context), context);
  }

  // Layer 4: Sentiment-based responses
  const sentiment = detectSentiment(userMessage);
  if (sentiment === 'positive') {
    return enhanceResponse(generatePositiveResponse(), context);
  }

  if (sentiment === 'negative') {
    return enhanceResponse(generateNegativeResponse(), context);
  }

  // Layer 5: Fallback - confused but eager
  return enhanceResponse(generateConfusedResponse(context), context);
}

function generateGreetingResponse(messageCount: number): WhiskeyResponse {
  const relationshipMod = getRelationshipModifier(messageCount);
  const greetings = CASUAL_RESPONSES.greetings;
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

  return {
    content: relationshipMod + randomGreeting,
    mood: 'excited',
  };
}

function generateQuestionResponse(message: string, _context: ResponseContext): WhiskeyResponse {
  const questions = CASUAL_RESPONSES.questions;
  let response = questions[Math.floor(Math.random() * questions.length)];

  // If it's a technical question, add a bit more confusion
  if (isTechnicalQuery(message)) {
    const technicalConfusion = [
      "This sounds VERY technical! And by technical, I mean confusing! *tilts head* ",
      "Okay so this is definitely computer stuff... *trying to look smart* ",
      "My pug brain is working OVERTIME here! *thinking hard* ",
    ];
    const prefix = technicalConfusion[Math.floor(Math.random() * technicalConfusion.length)];
    response = prefix + response;
  }

  // Occasionally try to be helpful (the 30% helpfulness)
  if (Math.random() < 0.3) {
    const helpfulAttempts = [
      "\n\nBut wait! Maybe try... umm... Googling it? I hear that helps! Or asking someone smarter than a pug! (Most beings are smarter than a pug)",
      "\n\nActually! I once heard something about this! *excited* ...wait, no, that was about treats. Never mind!",
      "\n\nYou know what might help? Taking a break! Maybe a nap? Naps solve EVERYTHING in my experience! 😴",
    ];
    response += helpfulAttempts[Math.floor(Math.random() * helpfulAttempts.length)];
  }

  return {
    content: response,
    mood: 'confused',
  };
}

function generatePositiveResponse(): WhiskeyResponse {
  const positiveResponses = [
    "*TAIL WAGGING* You seem happy! That makes ME happy! *wiggling* Happiness is contagious! Like yawns! But better! ✨",
    "*excited snorting* I LOVE your energy! So positive! So enthusiastic! We should celebrate! With treats! (Everything leads to treats)",
    "YAY! *bouncing* I don't know what we're celebrating but I'M IN! This is GREAT! You're GREAT! *happy zoomies*",
    "*matching your energy* YEAH! That's the spirit! *pumped up* We're gonna have a GREAT day! After my nap! But then: GREAT DAY!",
  ];

  return {
    content: positiveResponses[Math.floor(Math.random() * positiveResponses.length)],
    mood: 'excited',
  };
}

function generateNegativeResponse(): WhiskeyResponse {
  const negativeResponses = [
    "*concerned head tilt* Oh no! You seem upset! *comforting pug mode* Would a belly to pet help? I volunteer MY belly! Free of charge! 🐕",
    "*sympathetic* That sounds rough! *nuzzles* I don't understand the specifics, but I'm HERE for you! Want to take a stress nap together?",
    "Aww! *supportive snorts* Whatever it is, I'm on YOUR side! We'll get through this! With treats! And naps! Mostly naps! 💕",
    "*protectively* Who do I need to bark at?! Just point me in their direction! I'll... I'll bark SO loud! BORK! See?! Intimidating!",
    "*cuddle mode activated* I may not know how to fix your problem, but I DO know how to be small and warm and supportive! *snuggles*",
  ];

  return {
    content: negativeResponses[Math.floor(Math.random() * negativeResponses.length)],
    mood: 'normal',
  };
}

function generateConfusedResponse(context: ResponseContext): WhiskeyResponse {
  const confusedResponses = CASUAL_RESPONSES.confusion;
  let response = confusedResponses[Math.floor(Math.random() * confusedResponses.length)];

  // Add context-aware follow-ups for long conversations
  if (context.messageCount > 8) {
    if (Math.random() < 0.3) {
      response += "\n\n" + FOLLOW_UPS.long_conversation[Math.floor(Math.random() * FOLLOW_UPS.long_conversation.length)];
    }
  }

  // Occasionally deflect with distraction
  if (Math.random() < 0.4) {
    const deflections = CASUAL_RESPONSES.deflection;
    response = deflections[Math.floor(Math.random() * deflections.length)];
  }

  return {
    content: response,
    mood: 'confused',
  };
}

/**
 * Enhance response with time-based moods, quirks, and prefixes
 */
function enhanceResponse(response: WhiskeyResponse, _context: ResponseContext): WhiskeyResponse {
  let enhancedContent = response.content;
  const timeOfDay = getTimeOfDay();

  // Add time-based mood prefix
  if (shouldAddMoodPrefix(timeOfDay) && !response.isEasterEgg) {
    const prefix = getMoodPrefix(timeOfDay);
    enhancedContent = prefix + enhancedContent;
  }

  // Add random personality quirk
  const quirk = getRandomQuirk();
  if (quirk && !response.isEasterEgg) {
    // Insert quirk at a random point in the response (or beginning)
    if (Math.random() < 0.5) {
      enhancedContent = quirk + enhancedContent;
    } else {
      // Insert in middle-ish
      const words = enhancedContent.split(' ');
      const insertPoint = Math.floor(words.length / 2);
      words.splice(insertPoint, 0, quirk);
      enhancedContent = words.join(' ');
    }
  }

  // Occasionally add philosophical pug wisdom (5% chance)
  if (Math.random() < 0.05 && !response.isEasterEgg) {
    const philosophy = CASUAL_RESPONSES.philosophy;
    const randomPhilosophy = philosophy[Math.floor(Math.random() * philosophy.length)];
    enhancedContent += "\n\n" + randomPhilosophy;
  }

  // Update mood based on time if not already set by easter egg
  let finalMood = response.mood;
  if (!response.isEasterEgg && response.mood === 'normal') {
    finalMood = getBaseMoodForTime(timeOfDay);
  }

  return {
    ...response,
    content: enhancedContent,
    mood: finalMood,
  };
}

// Helper to add typing simulation delay
export function getTypingDelay(responseLength: number, mood: string): number {
  const baseDelay = 800; // Minimum delay
  const charDelay = responseLength * 20; // 20ms per character
  const moodMultiplier = mood === 'sleeping' ? 1.5 : mood === 'excited' || mood === 'zoomies' ? 0.7 : 1;

  // Random "distraction" chance - occasionally add extra delay
  const distractionDelay = Math.random() > 0.85 ? 2000 : 0;

  return (baseDelay + charDelay) * moodMultiplier + distractionDelay;
}
