'use client';

import { useState, useEffect } from 'react';
import { PageTransition } from '@/components/PageTransition';
import { ArticleCard } from '@/components/ArticleCard';
import { Search } from 'lucide-react';

export default function PoetryPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/posts');
        if (res.ok) {
          const data = await res.json();
          setPosts(data.filter((p: any) => p.type === 'poetry' && p.published));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-20 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">Poetry</h1>
        <p className="text-xl text-gray-500 mb-12 font-serif max-w-2xl">
          Verses from the mind and heart.
        </p>

        {/* Search Bar */}
        <div className="relative mb-12 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#111] focus:bg-white dark:focus:bg-black focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all placeholder:text-gray-400"
            placeholder="Search poetry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-64 bg-gray-100 dark:bg-gray-900 rounded-2xl w-full"></div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post: any) => (
              <ArticleCard
                key={post.id}
                title={post.title}
                excerpt={post.content}
                date={new Date(post.createdAt).toLocaleDateString()}
                href={`/poetry/${post.slug}`}
                genre="Poetry"
                featuredImage={post.featuredImage}
              />
            ))}
          </div>
        )}

        {!loading && filteredPosts.length === 0 && (
          <p className="text-gray-500 italic mt-8 font-serif text-center py-12 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
            {searchQuery ? 'No poetry matches your search.' : 'No poetry has been published yet.'}
          </p>
        )}
      </div>
    </PageTransition>
  );
}
