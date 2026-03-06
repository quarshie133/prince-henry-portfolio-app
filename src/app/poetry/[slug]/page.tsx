import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type Params = Promise<{ slug: string }>;

export default async function PoemPage(props: { params: Params }) {
  const params = await props.params;
  const post = await prisma.post.findUnique({
    where: { slug: params.slug, type: 'poetry' }
  });

  if (!post || !post.published) return notFound();

  return (
    <div className="container mx-auto px-4 py-20 max-w-2xl">
      <Link href="/poetry" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors mb-12">
        <ArrowLeft size={16} /> Back to poetry
      </Link>
      
      <article>
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">{post.title}</h1>
          <time className="text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</time>
        </header>
        
        <div className="font-serif text-lg leading-loose text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
          {post.content}
        </div>
      </article>
    </div>
  );
}
