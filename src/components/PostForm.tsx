'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Save, ArrowLeft } from 'lucide-react';

interface PostFormProps {
  type: 'poetry' | 'story';
  initialData?: {
    id: string;
    title: string;
    content: string;
    published: boolean;
  };
}

export function PostForm({ type, initialData }: PostFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title'),
      content: formData.get('content'),
      type,
      published: formData.get('published') === 'on',
      id: initialData?.id
    };

    try {
      const res = await fetch('/api/posts', {
        method: initialData ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (res.ok) {
        router.push(type === 'poetry' ? '/dashboard/poetry' : '/dashboard/stories');
        router.refresh();
      } else {
        const errData = await res.json();
        console.error('Failed to save post:', errData);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit} 
      className="bg-white/80 dark:bg-[#111]/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-6"
    >
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
        <input 
          required 
          name="title" 
          defaultValue={initialData?.title}
          className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white outline-none text-lg font-serif transition-shadow" 
          placeholder={`Enter ${type} title...`}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
        <textarea 
          required 
          name="content"
          defaultValue={initialData?.content}
          rows={14} 
          className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white outline-none font-serif leading-loose resize-y transition-shadow"
          placeholder="Write your masterpiece..."
        />
      </div>

      <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-[#0a0a0a] rounded-xl border border-gray-100 dark:border-gray-800">
        <div className="relative flex items-center">
          <input 
            type="checkbox" 
            name="published" 
            id="published" 
            defaultChecked={initialData?.published}
            className="peer w-5 h-5 cursor-pointer appearance-none rounded border-2 border-gray-300 dark:border-gray-600 checked:bg-black checked:border-black dark:checked:bg-white dark:checked:border-white transition-all"
          />
          <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity text-white dark:text-black" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <label htmlFor="published" className="text-sm font-medium cursor-pointer text-gray-700 dark:text-gray-300 select-none">
          Publish this {type} immediately
        </label>
      </div>

      <div className="pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col-reverse sm:flex-row justify-end gap-3">
        <button 
          type="button" 
          onClick={() => router.back()} 
          className="px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft size={18} /> Cancel
        </button>
        <button 
          type="submit" 
          disabled={loading} 
          className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:shadow-none"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin" />
          ) : (
            <Save size={18} />
          )}
          {loading ? 'Saving...' : initialData ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </motion.form>
  );
}
