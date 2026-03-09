import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type Params = Promise<{ slug: string }>;

export default async function BlogPostPage(props: { params: Params }) {
  const params = await props.params;
  const post = await prisma.post.findUnique({
    where: { slug: params.slug, type: 'story' }
  });

  if (!post || !post.published) return notFound();

  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <Link href="/stories" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors mb-12">
        <ArrowLeft size={16} /> Back to stories
      </Link>

      <article>
        <header className="mb-12">
          {(post as any).featuredImage && (
            <div className="w-full aspect-[21/9] mb-12 rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#111]">
              <img
                src={(post as any).featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium mb-6 tracking-tight leading-tight pt-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-gray-500 font-medium text-sm">
            <time>{new Date(post.createdAt).toLocaleDateString()}</time>
            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
            <span className="uppercase tracking-widest text-xs">Story</span>
          </div>
        </header>

        <div className="prose prose-lg dark:prose-invert font-serif text-gray-800 dark:text-gray-200 leading-relaxed max-w-none prose-img:rounded-xl prose-a:text-blue-600 dark:prose-a:text-blue-400"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
