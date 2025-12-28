import { create } from 'zustand';
import { Message, Conversation } from '@/types/chat';

interface ChatState {
  // Current conversation
  currentConversation: Conversation | null;
  messages: Message[];
  isTyping: boolean;

  // Actions
  setCurrentConversation: (conversation: Conversation | null) => void;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  setTyping: (isTyping: boolean) => void;
  clearMessages: () => void;
  createNewConversation: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  currentConversation: null,
  messages: [],
  isTyping: false,

  setCurrentConversation: (conversation) =>
    set({
      currentConversation: conversation,
      messages: conversation?.messages || [],
    }),

  addMessage: (message) =>
    set((state) => {
      const newMessages = [...state.messages, message];

      // Update current conversation if it exists
      if (state.currentConversation) {
        return {
          messages: newMessages,
          currentConversation: {
            ...state.currentConversation,
            messages: newMessages,
            updatedAt: new Date(),
          },
        };
      }

      return { messages: newMessages };
    }),

  setMessages: (messages) => set({ messages }),

  setTyping: (isTyping) => set({ isTyping }),

  clearMessages: () => set({ messages: [] }),

  createNewConversation: () =>
    set({
      currentConversation: null,
      messages: [],
      isTyping: false,
    }),
}));
