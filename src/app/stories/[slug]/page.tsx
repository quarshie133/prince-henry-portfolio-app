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
    <div className="container mx-auto px-4 py-20 max-w-2xl">
      <Link href="/stories" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors mb-12">
        <ArrowLeft size={16} /> Back to stories
      </Link>

      <article>
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4 tracking-tight">{post.title}</h1>
          <time className="text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</time>
        </header>

        <div className="prose prose-lg dark:prose-invert font-sans text-gray-800 dark:text-gray-200">
          {/* Simple splitting by double newline to create paragraphs since we don't have a markdown parser installed yet */}
          {post.content.split('\n\n').map((paragraph: string, idx: number) => (
            <p key={idx} className="mb-6 whitespace-pre-wrap">{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
}
