'use client';

import { useChat } from '@/hooks/useChat';
import { useConversations } from '@/hooks/useConversations';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/sidebar/Sidebar';
import { StorageWarningBanner } from '@/components/ui/StorageWarningBanner';
import { InstallPrompt } from '@/components/ui/InstallPrompt';

export default function ChatContainer() {
  const { messages, sendMessage, isTyping, currentConversationId } = useChat();
  const { startNewConversation } = useConversations();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatKey, setChatKey] = useState(0);

  // Update chatKey when conversation ID changes to ensure clean remount
  useEffect(() => {
    setChatKey(prev => prev + 1);
  }, [currentConversationId]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  const handleNewChat = () => {
    startNewConversation();
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen-safe overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main chat area */}
      <div className="flex flex-col flex-1 min-w-0">
        <ChatHeader
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onNewChat={handleNewChat}
        />

        <StorageWarningBanner />

        <MessageList
          key={currentConversationId || `new-${chatKey}`}
          messages={messages}
          isTyping={isTyping}
          onPromptClick={sendMessage}
        />

        <MessageInput onSend={sendMessage} disabled={isTyping} />
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden touch-none"
          onClick={() => setSidebarOpen(false)}
          onTouchMove={(e) => e.preventDefault()}
        />
      )}

      {/* PWA Install Prompt */}
      <InstallPrompt />
    </div>
  );
}
