import { prisma } from '@/lib/prisma';
import HeroSettingsForm from '../hero/HeroSettingsForm';

export const dynamic = 'force-dynamic';

export default async function HeroSettingsPage() {
  let settings = null;

  try {
    settings = await prisma.siteSettings.findUnique({
      where: { id: 'singleton' }
    });
  } catch (error) {
    console.error("Skipping DB fetch during prerender:", error);
  }

  const defaultSettings = settings || {
    heroTitle: "Words that resonate, stories that endure.",
    heroSub: "Welcome to my digital garden. I write about poetry, technology, and the spaces in between.",
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="pb-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-3xl font-serif font-medium mb-2">Hero Section</h1>
        <p className="text-gray-500">Customize the welcome text on your homepage.</p>
      </div>

      <HeroSettingsForm initialData={defaultSettings} />
    </div>
  );
}
