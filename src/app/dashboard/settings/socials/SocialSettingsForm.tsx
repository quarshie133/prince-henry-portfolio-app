'use client';

import { motion } from 'framer-motion';
import { updateSocialSettings } from '@/app/actions/settings';
import { useState, useTransition } from 'react';
import { Save, Check } from 'lucide-react';

export default function SocialSettingsForm({ initialData }: { initialData: any }) {
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      await updateSocialSettings(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-[#111]/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm"
    >
      <form action={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Instagram URL</label>
            <input type="url" name="instagram" defaultValue={initialData.instagram || ''} className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white outline-none" placeholder="https://instagram.com/..." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Twitter (X) URL</label>
            <input type="url" name="twitter" defaultValue={initialData.twitter || ''} className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white outline-none" placeholder="https://x.com/..." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Medium URL</label>
            <input type="url" name="medium" defaultValue={initialData.medium || ''} className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white outline-none" placeholder="https://medium.com/@..." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Substack URL</label>
            <input type="url" name="substack" defaultValue={initialData.substack || ''} className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white outline-none" placeholder="https://yourname.substack.com..." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Snapchat URL</label>
            <input type="url" name="snapchat" defaultValue={initialData.snapchat || ''} className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white outline-none" placeholder="https://snapchat.com/add/..." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">WhatsApp Number</label>
            <input type="text" name="whatsapp" defaultValue={initialData.whatsapp || ''} className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white outline-none" placeholder="+1234567890" />
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-800">
          <div className="text-sm text-green-600 dark:text-green-400 font-medium">
            {saved && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="flex items-center gap-1.5"
              >
                <Check size={16} /> Settings saved successfully
              </motion.span>
            )}
          </div>
          
          <button 
            type="submit" 
            disabled={isPending} 
            className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2 shadow-md hover:shadow-lg disabled:shadow-none"
          >
            {isPending ? (
              <div className="w-4 h-4 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
