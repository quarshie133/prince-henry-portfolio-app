'use client';

import { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { markMessageRead, deleteMessage } from '@/app/actions/messages';
import { Mail, Trash2, Eye, EyeOff, ChevronDown, ChevronUp, Inbox } from 'lucide-react';

export default function MessagesClient({ messages }: { messages: any[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const unreadCount = messages.filter((m) => !m.read).length;

  const handleExpand = (id: string, isRead: boolean) => {
    setExpanded((prev) => (prev === id ? null : id));
    if (!isRead) {
      startTransition(async () => {
        await markMessageRead(id);
      });
    }
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteMessage(id);
    });
  };

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
        <Inbox size={40} className="text-gray-300 dark:text-gray-700" />
        <p className="text-gray-400 dark:text-gray-600 font-serif text-lg">No messages yet.</p>
        <p className="text-sm text-gray-400">Messages from your contact form will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {unreadCount > 0 && (
        <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium">
          <Mail size={15} />
          {unreadCount} unread message{unreadCount > 1 ? 's' : ''}
        </div>
      )}

      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className={`border rounded-2xl overflow-hidden transition-colors ${
                msg.read
                  ? 'border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111]'
                  : 'border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20'
              }`}
            >
              {/* Header Row */}
              <button
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                onClick={() => handleExpand(msg.id, msg.read)}
              >
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${msg.read ? 'bg-gray-300 dark:bg-gray-700' : 'bg-blue-500'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className={`font-medium text-sm ${!msg.read ? 'font-semibold' : ''}`}>{msg.name}</span>
                    <span className="text-xs text-gray-400 dark:text-gray-600">{msg.email}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5">{msg.message}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-2">
                  <span className="text-xs text-gray-400 hidden sm:block whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  {expanded === msg.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </div>
              </button>

              {/* Expanded Message Body */}
              <AnimatePresence>
                {expanded === msg.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 border-t border-gray-100 dark:border-gray-800 pt-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">From</p>
                          <p className="font-medium">{msg.name}</p>
                          <a href={`mailto:${msg.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">{msg.email}</a>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Received</p>
                          <p>{new Date(msg.createdAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Message</p>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap bg-gray-50 dark:bg-white/5 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                          {msg.message}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 pt-1">
                        <a
                          href={`mailto:${msg.email}?subject=Re: your message`}
                          className="px-4 py-2 text-sm bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-80 transition-opacity font-medium"
                        >
                          Reply via Email
                        </a>
                        <button
                          onClick={() => handleDelete(msg.id)}
                          disabled={isPending}
                          className="px-4 py-2 text-sm text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                        {!msg.read && (
                          <span className="ml-auto text-xs text-blue-500 dark:text-blue-400 flex items-center gap-1">
                            <Eye size={13} /> Marked as read
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
