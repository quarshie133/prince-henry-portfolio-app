import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { PageTransition } from '@/components/PageTransition';

export default async function ShortStoriesPage() {
  const posts = await prisma.post.findMany({
    where: { type: 'story', published: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-20 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">Short Stories</h1>
        <p className="text-xl text-gray-500 mb-16 font-serif">
          A collection of narratives and reflections.
        </p>
        
        <div className="flex flex-col gap-10">
          {posts.map((post: any, i: number) => (
            <Link key={post.id} href={`/stories/${post.slug}`} className="block group">
              <article className="p-6 -mx-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-[#111] transition-colors border border-transparent dark:hover:border-gray-800">
                <div className="text-sm text-gray-500 mb-2">{new Date(post.createdAt).toLocaleDateString()}</div>
                <h2 className="text-2xl font-serif font-medium mb-3 group-hover:underline underline-offset-4 decoration-gray-300 dark:decoration-gray-600">
                  {post.title}
                </h2>
                <div className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl line-clamp-3">
                   {post.content.replace(/<[^>]*>?/gm, "")}
                </div>
              </article>
            </Link>
          ))}

          {posts.length === 0 && (
            <p className="text-gray-500 italic mt-8 font-serif">No stories have been published yet.</p>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
