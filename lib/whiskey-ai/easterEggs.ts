import { EASTER_EGGS, PUG_FACTS } from './responseBank';
import { WhiskeyResponse } from '@/types/chat';

export function checkForEasterEgg(message: string): WhiskeyResponse | null {
  const lowerMessage = message.toLowerCase();

  // Check for exact easter egg matches
  for (const [trigger, data] of Object.entries(EASTER_EGGS)) {
    if (lowerMessage.includes(trigger.toLowerCase())) {
      const randomResponse = data.responses[Math.floor(Math.random() * data.responses.length)];

      return {
        content: randomResponse,
        mood: data.mood,
        isEasterEgg: true,
      };
    }
  }

  // 5% chance of random pug fact
  if (Math.random() < 0.05) {
    const randomFact = PUG_FACTS[Math.floor(Math.random() * PUG_FACTS.length)];
    return {
      content: "Oh! Random thought! *excited*",
      mood: 'normal',
      pugFact: randomFact,
    };
  }

  return null;
}

// Check for special keyword combinations
export function checkSpecialCombinations(message: string): WhiskeyResponse | null {
  // "Who's a good boy/dog/pug"
  if (/(who'?s|whos) (a|the) good (boy|dog|pug)/i.test(message)) {
    return {
      content: "*VIBRATING WITH EXCITEMENT* ME! IT'S ME! I'M THE GOOD BOY! *tail wagging so hard it might fall off* Was there ever any doubt?! 🏆",
      mood: 'excited',
      isEasterEgg: true,
    };
  }

  // "I love you"
  if (/i love you/i.test(message) || /love you/i.test(message)) {
    return {
      content: "*OVERWHELMED WITH EMOTION* I LOVE YOU TOO! SO MUCH! *happy crying* *tail wagging* *spinning* You're the BEST! Can I sit in your lap? I'm sitting in your lap! 💕",
      mood: 'excited',
      isEasterEgg: true,
    };
  }

  // "You're cute/adorable"
  if (/(you'?re|youre) (cute|adorable|sweet)/i.test(message)) {
    return {
      content: "*blushing* You think I'm cute?! *does a little spin* I KNOW I'm cute but it's nice to hear! Want me to do my 'sad puppy eyes' trick? *practices*",
      mood: 'excited',
      isEasterEgg: true,
    };
  }

  // "Bad dog/boy"
  if (/(bad|naughty) (dog|boy|pug)/i.test(message)) {
    return {
      content: "*ears droop* I'm... I'm bad? *sad puppy eyes* I didn't mean to! Was it the shoe I chewed? Or the trash I knocked over? Or... *lists 47 things* ...I'M SORRY! 😢",
      mood: 'confused',
      isEasterEgg: true,
    };
  }

  // "Vet" or "Doctor"
  if (/\b(vet|veterinarian|doctor)\b/i.test(message)) {
    return {
      content: "*PANIC* Did you say THE V WORD?! *hides under desk* I'm not going! You can't make me! I'm perfectly healthy! See? *runs around* FINE! *nervous panting*",
      mood: 'alert',
      isEasterEgg: true,
    };
  }

  // "Bath" or "wash"
  if (/\b(bath|shower|wash)\b/i.test(message)) {
    return {
      content: "BATH?! *runs away* NO NO NO NO! I just got my smell perfect! It took WEEKS to smell this good! *hiding* You'll never take me alive! 🛁",
      mood: 'alert',
      isEasterEgg: true,
    };
  }

  // "Whiskey" (addressing by name)
  if (/\bwhiskey\b/i.test(message) && message.length < 30) {
    return {
      content: "*ears perk up* YES?! That's me! I'm Whiskey! You called my name! *tail wagging* Are we going somewhere?! Is it treat time?! TELL ME! 🐕",
      mood: 'alert',
      isEasterEgg: true,
    };
  }

  return null;
}

// Generate celebratory response for achieving something
export function getCelebrationResponse(): WhiskeyResponse {
  const celebrations = [
    "🎉 *CELEBRATION MODE* We did it! We did the thing! I don't know what thing, but WE DID IT! *zoomies* *victory lap* I'M SO PROUD OF US!",
    "✨ SUCCESS! *confetti in my mind* That was AMAZING! You're amazing! I'm amazing! Everything is AMAZING! Time for celebration treats?! 🦴",
    "*PARTY TIME* WOOHOO! Look at us being successful! I helped, right? I feel like I helped! *proud pug pose* HIGH FIVE! (I don't have thumbs)",
  ];

  return {
    content: celebrations[Math.floor(Math.random() * celebrations.length)],
    mood: 'zoomies',
    isEasterEgg: true,
  };
}
