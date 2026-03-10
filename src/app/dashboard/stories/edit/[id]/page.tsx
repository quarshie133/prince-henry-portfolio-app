import { PostForm } from '@/components/PostForm';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function EditStoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post || post.type !== 'story') {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="pb-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-3xl font-serif font-medium mb-2">Edit Story</h1>
        <p className="text-gray-500">Update your story '{post.title}'.</p>
      </div>
      <PostForm post={post} />
    </div>
  );
}


