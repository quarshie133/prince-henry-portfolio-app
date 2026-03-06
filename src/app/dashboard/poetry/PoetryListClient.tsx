'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Post } from '@prisma/client';

export default function PoetryListClient({ 
  posts, 
  deletePostAction 
}: { 
  posts: Post[];
  deletePostAction: (formData: FormData) => Promise<void>;
}) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-end pb-6 border-b border-gray-200 dark:border-gray-800"
      >
        <div>
          <h1 className="text-3xl font-serif font-medium mb-2">Poetry</h1>
          <p className="text-gray-500">Manage your poetry posts.</p>
        </div>
        <Link href="/dashboard/poetry/new" className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-medium rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-black/10 dark:shadow-white/10">
          <Plus size={18} /> New Poem
        </Link>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 dark:bg-[#111]/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm"
      >
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50/50 dark:bg-[#0a0a0a]/50 border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-500">Title</th>
              <th className="px-6 py-4 font-medium text-gray-500">Status</th>
              <th className="px-6 py-4 font-medium text-gray-500">Date</th>
              <th className="px-6 py-4 font-medium text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <motion.tbody 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="divide-y divide-gray-200 dark:divide-gray-800"
          >
            {posts.map(post => (
              <motion.tr key={post.id} variants={itemVariants} className="group hover:bg-gray-50 dark:hover:bg-[#0a0a0a]/50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{post.title}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${post.published ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20'}`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  <Link href={`/dashboard/poetry/edit/${post.id}`} className="p-2 text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100">
                    <Pencil size={16} />
                  </Link>
                  <form action={deletePostAction}>
                    <input type="hidden" name="id" value={post.id} />
                    <button type="submit" className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100">
                      <Trash2 size={16} />
                    </button>
                  </form>
                </td>
              </motion.tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500 space-y-2">
                    <div className="w-12 h-12 bg-gray-50 dark:bg-[#0a0a0a] rounded-full flex items-center justify-center mb-2">
                      <Pencil size={20} className="text-gray-400" />
                    </div>
                    <p>No poetry posts found.</p>
                    <p className="text-sm">Start writing your first piece!</p>
                  </div>
                </td>
              </tr>
            )}
          </motion.tbody>
        </table>
      </motion.div>
    </div>
  );
}
