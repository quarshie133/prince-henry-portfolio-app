import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageTransition } from '@/components/PageTransition';

export default async function Home() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 'singleton' } });
  
  const [latestPoetry, latestEssays] = await Promise.all([
    prisma.post.findMany({
      where: { type: 'poetry', published: true },
      orderBy: { createdAt: 'desc' },
      take: 2
    }),
    prisma.post.findMany({
      where: { type: 'story', published: true },
      orderBy: { createdAt: 'desc' },
      take: 3
    })
  ]);

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        {/* Animated Hero Section */}
        <section className="mb-24 md:mb-32">
          <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight mb-6 leading-tight">
            {settings?.heroTitle || 'Words that resonate, stories that endure.'}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-10 leading-relaxed font-serif">
            {settings?.heroSub || 'Welcome to my digital garden. I write about poetry, technology, and the spaces in between.'}
          </p>
          <div className="flex gap-4 items-center">
            <Link href="/poetry" className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-medium rounded-full hover:scale-105 transition-transform duration-300">
              Read Poetry
            </Link>
            <Link href="/about" className="px-6 py-3 font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
              About Me
            </Link>
          </div>
        </section>

        {/* Selected Works - Poetry */}
        <section className="mb-24">
          <div className="flex justify-between items-end mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
            <h2 className="text-2xl font-serif font-medium">Selected Poetry</h2>
            <Link href="/poetry" className="text-sm font-medium text-gray-500 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1 group">
              View all <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {latestPoetry.map((post: any) => (
              <ArticleCard 
                key={post.id}
                title={post.title}
                excerpt={post.content}
                date={new Date(post.createdAt).toLocaleDateString()}
                href={`/poetry/${post.slug}`}
              />
            ))}
            {latestPoetry.length === 0 && <p className="text-gray-500 italic">No poetry published yet.</p>}
          </div>
        </section>

        {/* Latest Essays / Stories */}
        <section>
          <div className="flex justify-between items-end mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
            <h2 className="text-2xl font-serif font-medium">Short Stories</h2>
            <Link href="/stories" className="text-sm font-medium text-gray-500 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1 group">
              View all <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="flex flex-col gap-6">
            {latestEssays.map((post: any) => (
               <ArticleCard 
                key={post.id}
                title={post.title}
                excerpt={post.content}
                date={new Date(post.createdAt).toLocaleDateString()}
                href={`/stories/${post.slug}`}
              />
            ))}
            {latestEssays.length === 0 && <p className="text-gray-500 italic">No stories published yet.</p>}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

function ArticleCard({ title, excerpt, date, href }: { title: string, excerpt: string, date: string, href: string }) {
  // Simple excerpt generation
  const cleanExcerpt = excerpt.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...';
  
  return (
    <Link href={href} className="block group">
      <div className="p-6 rounded-2xl bg-gray-50 dark:bg-[#111] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors h-full border border-transparent dark:border-gray-800/50">
        <div className="text-xs text-gray-500 mb-3">{date}</div>
        <h3 className="text-xl font-serif font-medium mb-3 group-hover:underline underline-offset-4 decoration-gray-300 dark:decoration-gray-600">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
          {cleanExcerpt}
        </p>
      </div>
    </Link>
  );
}
