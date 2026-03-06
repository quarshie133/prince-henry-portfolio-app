'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    // Web3Forms integration handling
    const formData = new FormData(e.currentTarget);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      });
      
      const result = await response.json();
      
      if (response.status === 200) {
        setStatus('success');
        setMessage("Thank you! Your message has been sent successfully.");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
        setMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      setMessage("An unexpected error occurred. Please check your connection.");
    }
  };

  return (
    <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 rounded-2xl p-8 shadow-sm transition-colors duration-300">
      <h2 className="text-2xl font-serif font-medium mb-6">Send a Message</h2>
      
      {status === 'success' ? (
         <div className="p-4 bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-400 rounded-xl text-sm font-medium border border-green-200 dark:border-green-900 transition-colors">
            {message}
         </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Note: In a real environment, this should be in .env, but Web3Forms standard keys are public frontend keys anyway */}
          <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY_HERE"} />
          <input type="hidden" name="subject" value="New Submission from Writer Portfolio" />
          <input type="checkbox" name="botcheck" className="hidden" />

          {status === 'error' && (
             <div className="p-3 bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-400 rounded-xl text-sm font-medium border border-red-200 dark:border-red-900 transition-colors">
               {message}
             </div>
          )}
          
          <div className="space-y-1 mt-2">
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

          <div className="space-y-1 mt-2">
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

          <div className="space-y-1 mt-2">
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
            className="w-full mt-4 bg-black dark:bg-white text-white dark:text-black font-medium p-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
}
