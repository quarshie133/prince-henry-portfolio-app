import { prisma } from '@/lib/prisma';
import MessagesClient from './MessagesClient';

export const dynamic = 'force-dynamic';

export default async function MessagesPage() {
  let messages: any[] = [];

  try {
    // @ts-ignore - contactMessage model added via prisma db push
    messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Failed to fetch messages:', error);
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="pb-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-3xl font-serif font-medium mb-2">Messages</h1>
        <p className="text-gray-500">Contact form submissions from your visitors.</p>
      </div>
      <MessagesClient messages={messages} />
    </div>
  );
}
