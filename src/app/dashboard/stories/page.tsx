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
    await prisma.post.delete({ where: { id } });
    revalidatePath('/dashboard/stories');
    revalidatePath('/stories');
  }

  return <StoriesListClient posts={posts} deletePostAction={deletePost} />;
}
