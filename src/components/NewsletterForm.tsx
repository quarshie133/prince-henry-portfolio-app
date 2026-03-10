'use client';

import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

export default function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email || !email.includes('@')) {
            setStatus('error');
            setMessage('Please enter a valid email address.');
            return;
        }

        setStatus('loading');
        
        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            
            const data = await res.json();
            
            if (res.ok) {
                setStatus('success');
                setMessage(data.message || 'Thank you for subscribing.');
                setEmail('');
            } else {
                setStatus('error');
                setMessage(data.message || 'Failed to subscribe. Please try again.');
            }
        } catch (error) {
            setStatus('error');
            setMessage('An unexpected error occurred.');
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto mt-20 p-8 md:p-12 bg-white dark:bg-[#111] rounded-3xl border border-gray-100 dark:border-gray-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none relative overflow-hidden group">
            
            {/* Background Accent */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-gray-50 dark:bg-gray-900 rounded-full blur-3xl opacity-50 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gray-50 dark:bg-gray-900 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <Mail size={28} strokeWidth={1.5} className="text-black dark:text-white" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-serif font-medium mb-3">
                    Subscribe to the Newsletter
                </h3>
                
                <p className="text-gray-500 font-serif mb-8 max-w-md leading-relaxed">
                    Receive new poems, short stories, and reflections directly in your inbox. No spam, ever.
                </p>

                <form onSubmit={handleSubmit} className="w-full max-w-md relative">
                    <div className="relative flex items-center">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (status !== 'idle') setStatus('idle');
                            }}
                            placeholder="Email address"
                            className="w-full pl-6 pr-40 py-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-black focus:bg-white dark:focus:bg-black focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all placeholder:text-gray-400 font-sans shadow-inner"
                            required
                            disabled={status === 'loading'}
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading' || status === 'success'}
                            className="absolute right-2 top-2 bottom-2 px-6 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center justify-center min-w-[120px]"
                        >
                            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                        </button>
                    </div>

                    {/* Status Messages */}
                    {status === 'success' && (
                        <div className="absolute -bottom-10 left-0 right-0 flex items-center justify-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium animate-in fade-in slide-in-from-bottom-2">
                            <CheckCircle size={16} />
                            <span>{message}</span>
                        </div>
                    )}
                    
                    {status === 'error' && (
                        <div className="absolute -bottom-10 left-0 right-0 flex items-center justify-center gap-2 text-sm text-red-600 dark:text-red-400 font-medium animate-in fade-in slide-in-from-bottom-2">
                            <AlertCircle size={16} />
                            <span>{message}</span>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
