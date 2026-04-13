import { prisma } from '@/lib/prisma';
import StoriesListClient from '../stories/StoriesListClient';
import { revalidatePath } from 'next/cache';

export default async function StoriesManagement() {
  const posts = await prisma.post.findMany({
    where: { type: { in: ['story', 'article'] } },
    orderBy: { createdAt: 'desc' }
  });

  async function deletePost(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    // Use deleteMany so it silently succeeds even if the record is already gone (avoids P2025)
    await prisma.post.deleteMany({ where: { id } });
    revalidatePath('/dashboard/stories');
    revalidatePath('/stories');
  }

  return <StoriesListClient posts={posts} deletePostAction={deletePost} />;
}
