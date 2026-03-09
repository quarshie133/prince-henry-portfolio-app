import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { PageTransition } from '@/components/PageTransition';

export default async function AboutPage() {
  let settings = null;
  try {
    settings = await prisma.siteSettings.findUnique({ where: { id: 'singleton' } });
  } catch (error) {
    console.error("Skipping DB fetch for About page: Database is unreachable.");
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-20 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-serif font-medium mb-12 border-b border-gray-200 dark:border-gray-800 pb-6">About the Author</h1>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="w-full md:w-1/3 shrink-0">
            {/* Placeholder image for profile */}
            <div className="aspect-[4/5] w-full bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden relative border border-gray-200 dark:border-gray-800 group">
              <Image
                src="/profile_placeholder.png"
                alt="Profile picture placeholder"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={false}
              />
            </div>
          </div>

          <div className="w-full md:w-2/3 prose prose-lg dark:prose-invert font-serif leading-loose text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {settings?.aboutText || "Hello.\n\nI'm a writer bridging the gap between digital thoughts and tangible feelings. My work explores the intersections of modern life, technology, and timeless human emotions.\n\nThank you for reading."}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
