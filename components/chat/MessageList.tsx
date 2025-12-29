'use client';

import { useEffect, useRef } from 'react';
import { Message as MessageType } from '@/types/chat';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import { AnimatePresence } from 'framer-motion';

interface MessageListProps {
  messages: MessageType[];
  isTyping: boolean;
  onPromptClick?: (text: string) => void;
}

export default function MessageList({ messages, isTyping, onPromptClick }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Check if scrollbar is needed
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const checkScrollable = () => {
      if (container.scrollHeight > container.clientHeight) {
        container.setAttribute('data-scrollable', 'true');
      } else {
        container.removeAttribute('data-scrollable');
      }
    };

    checkScrollable();
    const observer = new ResizeObserver(checkScrollable);
    observer.observe(container);

    return () => observer.disconnect();
  }, [messages, isTyping]);

  return (
    <>
      <style jsx>{`
        .message-list::-webkit-scrollbar {
          width: 14px;
        }
        .message-list::-webkit-scrollbar-track {
          background: transparent;
        }
        .message-list::-webkit-scrollbar-thumb {
          background: transparent;
        }
        .message-list::-webkit-scrollbar-button {
          display: none;
        }
        /* Only show scrollbar when content overflows - Pug themed colors */
        .message-list[data-scrollable="true"]::-webkit-scrollbar-track {
          background: #F5E6D3 !important; /* pug-cream */
          border-radius: 7px;
          margin: 2px;
        }
        :global(.dark) .message-list[data-scrollable="true"]::-webkit-scrollbar-track {
          background: rgba(160, 137, 104, 0.15) !important; /* pug-brown-medium with opacity */
        }
        .message-list[data-scrollable="true"]::-webkit-scrollbar-thumb {
          background: #C77A4E !important; /* pug-fawn (orange) */
          border-radius: 7px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        :global(.dark) .message-list[data-scrollable="true"]::-webkit-scrollbar-thumb {
          background: #D4A574 !important; /* pug-fawn-light */
          border: 2px solid transparent;
          background-clip: padding-box;
        }
      `}</style>
      <div ref={scrollContainerRef} className="message-list flex-1 overflow-y-auto bg-light-background dark:bg-dark-background">
      <div className="max-w-4xl mx-auto px-3 xs:px-4 py-4 xs:py-6">
        {/* Welcome message when no messages */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-8 xs:py-12">
            <div className="text-5xl xs:text-6xl mb-3 xs:mb-4">🐶</div>
            <h2 className="text-xl xs:text-2xl font-bold text-light-text dark:text-dark-text mb-2">
              Welcome to Whiskey.ai!
            </h2>
            <p className="text-sm xs:text-base text-light-text-secondary dark:text-dark-text-secondary max-w-md px-4">
              <span className="hidden xs:inline">
                Hi! I&apos;m Whiskey, your friendly (and slightly confused) pug assistant! Ask me anything,
                and I&apos;ll do my very best to help... probably while getting distracted by treats! 🦴
              </span>
              <span className="xs:hidden">
                Hi! I&apos;m Whiskey, your friendly pug assistant! Ask me anything! 🦴
              </span>
            </p>

            <div className="mt-6 xs:mt-8 grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-3 w-full max-w-2xl px-4">
              <ExamplePrompt text="What is Python?" onClick={() => onPromptClick?.('What is Python?')} />
              <ExamplePrompt text="How do I center a div?" onClick={() => onPromptClick?.('How do I center a div?')} />
              <ExamplePrompt text="Tell me about treats" onClick={() => onPromptClick?.('Tell me about treats')} />
              <ExamplePrompt text="Good boy!" onClick={() => onPromptClick?.('Good boy!')} />
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
    </>
  );
}

function ExamplePrompt({ text, onClick }: { text: string; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="px-3 py-2.5 xs:px-4 xs:py-2 rounded-lg bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-xs xs:text-sm text-light-text-secondary dark:text-dark-text-secondary hover:border-pug-fawn dark:hover:border-pug-fawn-light cursor-pointer transition-colors active:scale-[0.98]"
    >
      &quot;{text}&quot;
    </div>
  );
}
