import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { PageTransition } from '@/components/PageTransition';

export default async function PoetryPage() {
  let posts: any[] = [];

  try {
    posts = await prisma.post.findMany({
      where: { type: 'poetry', published: true },
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error("Skipping DB fetch during prerender:", error);
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-20 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">Poetry</h1>
        <p className="text-xl text-gray-500 mb-16 font-serif">
          Verses from the mind and heart.
        </p>
        
        <div className="flex flex-col gap-12">
          {posts.map((post: any) => (
            <article key={post.id} className="border-l-2 border-gray-100 dark:border-gray-800 pl-6 hover:border-black dark:hover:border-white transition-colors py-2">
              <Link href={`/poetry/${post.slug}`} className="block group">
                <div className="text-sm text-gray-500 mb-2">{new Date(post.createdAt).toLocaleDateString()}</div>
                <h2 className="text-3xl font-serif font-medium mb-4 group-hover:underline underline-offset-4 decoration-gray-300 dark:decoration-gray-600">
                  {post.title}
                </h2>
                <div className="font-serif text-gray-600 dark:text-gray-400 leading-loose line-clamp-4 whitespace-pre-wrap">
                  {post.content}
                </div>
              </Link>
            </article>
          ))}

          {posts.length === 0 && (
            <p className="text-gray-500 italic mt-8 font-serif">No poetry has been published yet.</p>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
