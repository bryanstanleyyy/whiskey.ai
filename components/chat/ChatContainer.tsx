'use client';

import { useChat } from '@/hooks/useChat';
import { useConversations } from '@/hooks/useConversations';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useState } from 'react';
import Sidebar from '@/components/sidebar/Sidebar';

export default function ChatContainer() {
  const { messages, sendMessage, isTyping } = useChat();
  const { startNewConversation } = useConversations();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNewChat = () => {
    startNewConversation();
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main chat area */}
      <div className="flex flex-col flex-1 min-w-0">
        <ChatHeader
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onNewChat={handleNewChat}
        />

        <MessageList messages={messages} isTyping={isTyping} />

        <MessageInput onSend={sendMessage} disabled={isTyping} />
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
