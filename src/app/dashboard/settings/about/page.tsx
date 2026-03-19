import { prisma } from '@/lib/prisma';
import AboutSettingsForm from '../about/AboutSettingsForm';

export const dynamic = 'force-dynamic';

export default async function AboutSettingsPage() {
  let settings = null;

  try {
    settings = await prisma.siteSettings.findUnique({
      where: { id: 'singleton' }
    });
  } catch (error) {
    console.error("Skipping DB fetch during prerender:", error);
  }

  const defaultSettings = settings || {
    aboutText: "Hello. I'm a writer bridging the gap between digital thoughts and tangible feelings."
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="pb-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-3xl font-serif font-medium mb-2">About Page</h1>
        <p className="text-gray-500">Update the content on your about page.</p>
      </div>

      <AboutSettingsForm initialData={defaultSettings} />
    </div>
  );
}
