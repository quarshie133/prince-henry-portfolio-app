import { prisma } from '@/lib/prisma';
import AppearanceSettingsForm from './AppearanceSettingsForm';

export const dynamic = 'force-dynamic';

export default async function AppearanceSettingsPage() {
  let settings = null;
  try {
    settings = await prisma.siteSettings.findUnique({ where: { id: 'singleton' } });
  } catch (error) {}

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="pb-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-3xl font-serif font-medium mb-2">Appearance</h1>
        <p className="text-gray-500">Upload and change the background image on your homepage hero section.</p>
      </div>
      <AppearanceSettingsForm initialData={settings || {}} />
    </div>
  );
}
