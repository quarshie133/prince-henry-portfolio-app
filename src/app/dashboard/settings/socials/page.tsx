import { prisma } from '@/lib/prisma';
import SocialSettingsForm from '../socials/SocialSettingsForm';

export default async function SocialSettingsPage() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 'singleton' }
  });

  const defaultSettings = settings || {
    instagram: "",
    twitter: "",
    facebook: "",
    tiktok: "",
    snapchat: "",
    whatsapp: "+233 55 659 7805",
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="pb-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-3xl font-serif font-medium mb-2">Social Media</h1>
        <p className="text-gray-500">Update your social media handles and links.</p>
      </div>

      <SocialSettingsForm initialData={defaultSettings} />
    </div>
  );
}
