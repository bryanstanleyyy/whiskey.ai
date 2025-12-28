'use client';

import { useEffect, useState, useCallback } from 'react';
import { Conversation } from '@/types/chat';
import { ConversationStorage } from '@/lib/storage/conversationStorage';
import { useChatStore } from '@/stores/chatStore';

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const { setCurrentConversation, createNewConversation, conversationChangeCounter } = useChatStore();

  // Load conversations from localStorage
  const loadConversations = useCallback(() => {
    const loaded = ConversationStorage.getAllConversations();
    setConversations(loaded);
  }, []);

  // Load conversations on mount and when counter changes
  useEffect(() => {
    loadConversations();
  }, [loadConversations, conversationChangeCounter]);

  // Select a conversation
  const selectConversation = useCallback(
    (conversationId: string) => {
      const conversation = ConversationStorage.getConversation(conversationId);
      if (conversation) {
        setCurrentConversation(conversation);
      }
    },
    [setCurrentConversation]
  );

  // Delete a conversation
  const deleteConversation = useCallback(
    (conversationId: string) => {
      ConversationStorage.deleteConversation(conversationId);
      loadConversations();

      // If deleted conversation was current, create new
      const currentConv = useChatStore.getState().currentConversation;
      if (currentConv?.id === conversationId) {
        createNewConversation();
      }
    },
    [loadConversations, createNewConversation]
  );

  // Create new conversation
  const startNewConversation = useCallback(() => {
    createNewConversation();
  }, [createNewConversation]);

  // Clear all conversations
  const clearAllConversations = useCallback(() => {
    ConversationStorage.clearAll();
    loadConversations();
    createNewConversation();
  }, [loadConversations, createNewConversation]);

  return {
    conversations,
    selectConversation,
    deleteConversation,
    startNewConversation,
    clearAllConversations,
    refreshConversations: loadConversations,
  };
}
