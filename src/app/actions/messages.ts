'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function markMessageRead(id: string) {
  try {
    // @ts-ignore - contactMessage model added via prisma db push
    await prisma.contactMessage.update({
      where: { id },
      data: { read: true },
    });
    revalidatePath('/dashboard/messages');
  } catch (error) {
    console.error('Error marking message as read:', error);
  }
}

export async function deleteMessage(id: string) {
  try {
    // @ts-ignore - contactMessage model added via prisma db push
    await prisma.contactMessage.delete({ where: { id } });
    revalidatePath('/dashboard/messages');
  } catch (error) {
    console.error('Error deleting message:', error);
  }
}
