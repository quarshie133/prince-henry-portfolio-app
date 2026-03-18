'use client';

import { useState } from 'react';
import { submitContactMessage } from '@/app/actions/contact';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Send } from 'lucide-react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    const result = await submitContactMessage(formData);

    if (result.success) {
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus('error');
      setErrorMsg(result.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 rounded-2xl p-8 shadow-sm transition-colors duration-300">
      <h2 className="text-2xl font-serif font-medium mb-6">Send a Message</h2>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center py-12 gap-4 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle size={36} className="text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-serif font-medium">Message Sent!</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs">
              Thank you for reaching out. I'll get back to you as soon as possible.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-2 text-sm text-gray-500 hover:text-black dark:hover:text-white underline underline-offset-4 transition-colors"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-5"
          >
            {status === 'error' && (
              <div className="p-3 bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-400 rounded-xl text-sm font-medium border border-red-200 dark:border-red-900">
                {errorMsg}
              </div>
            )}

            <div className="space-y-1">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-colors"
                placeholder="Your name"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <textarea
                name="message"
                id="message"
                required
                rows={5}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white outline-none resize-y transition-colors"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full mt-2 bg-black dark:bg-white text-white dark:text-black font-medium p-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
