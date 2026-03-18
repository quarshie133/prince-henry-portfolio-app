'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function submitContactMessage(formData: FormData) {
  const name = (formData.get('name') as string)?.trim();
  const email = (formData.get('email') as string)?.trim();
  const message = (formData.get('message') as string)?.trim();

  if (!name || !email || !message) {
    return { success: false, error: 'All fields are required.' };
  }

  try {
    await (prisma as any).contactMessage.create({
      data: { name, email, message },
    });
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Contact form error:', error);
    return { success: false, error: 'Failed to send message. Please try again.' };
  }
}
