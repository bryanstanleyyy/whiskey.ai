'use client';

import { useCallback } from 'react';
import { useChatStore } from '@/stores/chatStore';
import { generateResponse } from '@/lib/whiskey-ai/responseGenerator';
import { calculateTypingDelay } from '@/lib/utils/timing';
import { ConversationStorage } from '@/lib/storage/conversationStorage';
import { Message } from '@/types/chat';
import { extractTopics } from '@/lib/whiskey-ai/keywordDetector';
import { getTimeOfDay } from '@/lib/whiskey-ai/moodSystem';

export function useChat() {
  const {
    currentConversation,
    messages,
    isTyping,
    addMessage,
    setTyping,
    setCurrentConversation,
    triggerConversationRefresh,
  } = useChatStore();

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isTyping) return;

      // Create user message
      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: content.trim(),
        timestamp: new Date(),
      };

      // Add user message to store
      addMessage(userMessage);

      // Create or update conversation
      let conversation = currentConversation;

      if (!conversation) {
        // Create new conversation
        conversation = ConversationStorage.createConversation(userMessage);
        setCurrentConversation(conversation);
      } else {
        // Update existing conversation
        conversation = {
          ...conversation,
          messages: [...conversation.messages, userMessage],
          updatedAt: new Date(),
        };
        setCurrentConversation(conversation);
      }

      // Save conversation to localStorage
      ConversationStorage.saveConversation(conversation);
      triggerConversationRefresh(); // Notify sidebar to refresh

      // Set typing indicator
      setTyping(true);

      try {
        // Generate Whiskey's response
        const responseContext = {
          userMessage: content,
          conversationHistory: messages,
          timeOfDay: getTimeOfDay(),
          previousTopics: extractTopics(content),
          messageCount: messages.filter(m => m.role === 'user').length,
        };

        const whiskeyResponse = await generateResponse(responseContext);

        // Calculate and wait for typing delay
        const delay = calculateTypingDelay(
          whiskeyResponse.content.length,
          whiskeyResponse.mood
        );
        await new Promise(resolve => setTimeout(resolve, delay));

        // Create assistant message
        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: whiskeyResponse.content,
          timestamp: new Date(),
          metadata: {
            mood: whiskeyResponse.mood,
            pugFact: whiskeyResponse.pugFact,
            isEasterEgg: whiskeyResponse.isEasterEgg,
          },
        };

        // Add assistant message
        addMessage(assistantMessage);

        // Update conversation with assistant response
        conversation = {
          ...conversation,
          messages: [...conversation.messages, assistantMessage],
          updatedAt: new Date(),
        };
        setCurrentConversation(conversation);

        // Save updated conversation
        ConversationStorage.saveConversation(conversation);
        triggerConversationRefresh(); // Notify sidebar to refresh
      } catch (error) {
        console.error('Error generating response:', error);

        // Fallback error message
        const errorMessage: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: "*confused whimpering* Something went wrong! My pug brain short-circuited! Try asking again? *hopeful tail wag*",
          timestamp: new Date(),
          metadata: {
            mood: 'confused',
          },
        };

        addMessage(errorMessage);
      } finally {
        setTyping(false);
      }
    },
    [currentConversation, messages, isTyping, addMessage, setTyping, setCurrentConversation, triggerConversationRefresh]
  );

  return {
    messages,
    sendMessage,
    isTyping,
    currentConversationId: currentConversation?.id,
  };
}
