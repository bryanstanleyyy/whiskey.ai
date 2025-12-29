'use client';

import { Message as MessageType } from '@/types/chat';
import { motion } from 'framer-motion';
import PugAvatar from '@/components/ui/PugAvatar';
import { User } from 'lucide-react';

interface MessageProps {
  message: MessageType;
  isLatest?: boolean;
}

export default function Message({ message, isLatest = false }: MessageProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-2 xs:gap-3 mb-3 xs:mb-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      {!isUser && (
        <PugAvatar mood={message.metadata?.mood || 'normal'} animated={isLatest} />
      )}

      {isUser && (
        <div className="flex items-center justify-center w-8 h-8 xs:w-10 xs:h-10 rounded-full bg-light-user-bubble dark:bg-dark-user-bubble shrink-0">
          <User size={16} className="xs:w-5 xs:h-5 text-light-user-text dark:text-dark-user-text" />
        </div>
      )}

      {/* Message Content */}
      <div className="flex flex-col max-w-[85%] xs:max-w-[80%] sm:max-w-[75%] lg:max-w-[70%]">
        <div
          className={`rounded-2xl px-3 py-2 xs:px-4 xs:py-3 ${
            isUser
              ? 'bg-light-user-bubble dark:bg-dark-user-bubble text-light-user-text dark:text-dark-user-text'
              : 'bg-light-whiskey-bubble dark:bg-dark-whiskey-bubble text-light-whiskey-text dark:text-dark-whiskey-text'
          }`}
        >
          <div className="whitespace-pre-wrap break-words text-sm xs:text-base">
            {message.content}
          </div>

          {/* Pug Fact (if present) */}
          {message.metadata?.pugFact && (
            <div className="mt-2 pt-2 border-t border-light-border dark:border-dark-border opacity-80 text-xs xs:text-sm">
              💡 {message.metadata.pugFact}
            </div>
          )}
        </div>

        {/* Timestamp */}
        <div
          className={`text-[10px] xs:text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1 px-2 ${
            isUser ? 'text-right' : 'text-left'
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </motion.div>
  );
}
