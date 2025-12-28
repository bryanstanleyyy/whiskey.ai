import { Conversation, Message } from '@/types/chat';

const STORAGE_KEY = 'whiskey_conversations';
const MAX_CONVERSATIONS = 50;

/**
 * Conversation storage manager - handles localStorage operations
 */
export class ConversationStorage {
  /**
   * Save or update a conversation
   */
  static saveConversation(conversation: Conversation): void {
    if (typeof window === 'undefined') return; // Skip on server-side

    try {
      const conversations = this.getAllConversations();
      const existingIndex = conversations.findIndex(c => c.id === conversation.id);

      if (existingIndex >= 0) {
        // Update existing conversation
        conversations[existingIndex] = {
          ...conversation,
          updatedAt: new Date(),
        };
      } else {
        // Add new conversation at the beginning
        conversations.unshift({
          ...conversation,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      // Keep only recent conversations
      const trimmed = conversations.slice(0, MAX_CONVERSATIONS);

      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    } catch (error) {
      console.error('Error saving conversation:', error);
    }
  }

  /**
   * Get all conversations
   */
  static getAllConversations(): Conversation[] {
    if (typeof window === 'undefined') return [];

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];

      const parsed = JSON.parse(stored) as Conversation[];

      // Convert date strings back to Date objects
      return parsed.map((conv) => ({
        ...conv,
        createdAt: new Date(conv.createdAt),
        updatedAt: new Date(conv.updatedAt),
        messages: conv.messages.map((msg) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })),
      }));
    } catch (error) {
      console.error('Error loading conversations:', error);
      return [];
    }
  }

  /**
   * Get a specific conversation by ID
   */
  static getConversation(id: string): Conversation | null {
    const conversations = this.getAllConversations();
    return conversations.find(c => c.id === id) || null;
  }

  /**
   * Delete a conversation
   */
  static deleteConversation(id: string): void {
    if (typeof window === 'undefined') return;

    try {
      const conversations = this.getAllConversations();
      const filtered = conversations.filter(c => c.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  }

  /**
   * Clear all conversations
   */
  static clearAll(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing conversations:', error);
    }
  }

  /**
   * Generate a title from the first user message
   */
  static generateTitle(firstMessage: string): string {
    // Take first 40 chars or until first sentence-ending punctuation
    const truncated = firstMessage.slice(0, 40).split(/[.?!]/)[0].trim();
    return truncated + (firstMessage.length > 40 ? '...' : '');
  }

  /**
   * Create a new conversation
   */
  static createConversation(firstMessage: Message): Conversation {
    return {
      id: crypto.randomUUID(),
      title: this.generateTitle(firstMessage.content),
      messages: [firstMessage],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  /**
   * Update conversation title based on first message
   */
  static updateConversationTitle(conversationId: string, newTitle: string): void {
    const conversation = this.getConversation(conversationId);
    if (conversation) {
      conversation.title = newTitle;
      this.saveConversation(conversation);
    }
  }
}
