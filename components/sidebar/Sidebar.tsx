'use client';

import { useConversations } from '@/hooks/useConversations';
import { useChatStore } from '@/stores/chatStore';
import { MessageSquare, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { conversations, selectConversation, deleteConversation } =
    useConversations();
  const { currentConversation } = useChatStore();

  const handleSelectConversation = (id: string) => {
    selectConversation(id);
    onClose();
  };

  return (
    <aside
      className={`
        fixed lg:static inset-y-0 left-0 z-40
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300
        w-64 xs:w-72 bg-light-surface dark:bg-dark-surface border-r border-light-border dark:border-dark-border
        flex flex-col
        pt-safe-top pb-safe-bottom
      `}
    >
      {/* Header */}
      <div className="py-4 xs:py-5 px-3 xs:px-4 border-b border-light-border dark:border-dark-border">
        <h2 className="text-base xs:text-lg font-semibold text-light-text dark:text-dark-text flex items-center gap-2">
          <MessageSquare size={18} className="xs:w-5 xs:h-5" />
          Chat History
        </h2>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto p-2">
        <AnimatePresence>
          {conversations.length === 0 ? (
            <div className="p-4 text-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
              No conversations yet.
              <br />
              Start chatting with Whiskey!
            </div>
          ) : (
            conversations.map((conversation) => (
              <motion.div
                key={conversation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="mb-1"
              >
                <div
                  className={`
                    group relative flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer
                    transition-colors
                    ${
                      currentConversation?.id === conversation.id
                        ? 'bg-pug-fawn/10 dark:bg-pug-fawn-light/10'
                        : 'hover:bg-light-background dark:hover:bg-dark-background'
                    }
                  `}
                  onClick={() => handleSelectConversation(conversation.id)}
                >
                  <MessageSquare
                    size={16}
                    className="text-pug-fawn dark:text-pug-fawn-light shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-light-text dark:text-dark-text truncate">
                      {conversation.title}
                    </div>
                    <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                      {new Date(conversation.updatedAt).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversation(conversation.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/10 transition-all"
                    aria-label="Delete conversation"
                  >
                    <Trash2 size={14} className="text-red-500" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="p-3 xs:p-4 border-t border-light-border dark:border-dark-border">
        <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary text-center">
          Made with ❤️ by Whiskey 🐶<br />
          (and Bryan)
        </div>
      </div>
    </aside>
  );
}
