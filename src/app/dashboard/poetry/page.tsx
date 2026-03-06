import { prisma } from '@/lib/prisma';
import PoetryListClient from './PoetryListClient';
import { revalidatePath } from 'next/cache';

export default async function PoetryManagement() {
  const posts = await prisma.post.findMany({
    where: { type: 'poetry' },
    orderBy: { createdAt: 'desc' }
  });

  async function deletePost(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    await prisma.post.delete({ where: { id } });
    revalidatePath('/dashboard/poetry');
    revalidatePath('/poetry');
  }

  return <PoetryListClient posts={posts} deletePostAction={deletePost} />;
}
