'use client';

import { motion } from 'framer-motion';
import { updateAppearanceSettings } from '@/app/actions/settings';
import { useState, useTransition } from 'react';
import { Save, Check, Upload } from 'lucide-react';

export default function AppearanceSettingsForm({ initialData }: { initialData: any }) {
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialData.dashboardImage || '');
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = (formData: FormData) => {
    formData.set('heroBgImage', imageUrl);
    startTransition(async () => {
      await updateAppearanceSettings(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setImageUrl(data.url);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image. Please try again or provide a URL directly.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-[#111]/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm"
    >
      <form action={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
            Hero Background Image
          </label>
          
          <div className="flex gap-4 items-start">
            <div className="flex-1">
              <label className="cursor-pointer inline-flex px-6 py-4 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-[#222] transition-colors items-center gap-3 text-sm font-medium w-full justify-center">
                <Upload size={20} className="text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">
                  {isUploading ? 'Uploading...' : 'Click to Upload Image from PC'}
                </span>
                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
              </label>
            </div>
            {imageUrl && (
              <div className="w-48 h-32 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 relative bg-gray-100 dark:bg-gray-900 shrink-0 shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl} alt="Background Preview" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            )}
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
                <Check size={16} /> Background updated
              </motion.span>
            )}
          </div>
          
          <button 
            type="submit" 
            disabled={isPending || isUploading} 
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
