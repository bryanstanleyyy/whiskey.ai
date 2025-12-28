'use client';

import { useEffect, useRef } from 'react';
import { Message as MessageType } from '@/types/chat';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import { AnimatePresence } from 'framer-motion';

interface MessageListProps {
  messages: MessageType[];
  isTyping: boolean;
}

export default function MessageList({ messages, isTyping }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto bg-light-background dark:bg-dark-background">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Welcome message when no messages */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="text-6xl mb-4">🐶</div>
            <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-2">
              Welcome to Whiskey.ai!
            </h2>
            <p className="text-light-text-secondary dark:text-dark-text-secondary max-w-md">
              Hi! I&apos;m Whiskey, your friendly (and slightly confused) pug assistant! Ask me anything,
              and I&apos;ll do my very best to help... probably while getting distracted by treats! 🦴
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
              <ExamplePrompt text="What is Python?" />
              <ExamplePrompt text="How do I center a div?" />
              <ExamplePrompt text="Tell me about treats" />
              <ExamplePrompt text="Good boy!" />
            </div>
          </div>
        )}

        {/* Messages */}
        <AnimatePresence>
          {messages.map((message, index) => (
            <Message
              key={message.id}
              message={message}
              isLatest={index === messages.length - 1}
            />
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && <TypingIndicator />}
        </AnimatePresence>

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

function ExamplePrompt({ text }: { text: string }) {
  return (
    <div className="px-4 py-2 rounded-lg bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-sm text-light-text-secondary dark:text-dark-text-secondary hover:border-pug-fawn dark:hover:border-pug-fawn-light cursor-pointer transition-colors">
      &quot;{text}&quot;
    </div>
  );
}
