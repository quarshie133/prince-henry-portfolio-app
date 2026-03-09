'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, AlertCircle } from 'lucide-react';
import Editor from './Editor';

interface PostFormProps {
  post?: any;
}

export function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: post?.title || '',
    type: post?.type || 'poetry',
    content: post?.content || '',
    featuredImage: post?.featuredImage || '',
    published: post?.published || false,
  });

  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let finalImageUrl = formData.featuredImage;

      if (fileToUpload) {
        const uploadForm = new FormData();
        uploadForm.append('file', fileToUpload);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadForm,
        });

        if (!uploadRes.ok) {
          throw new Error('Image upload failed');
        }

        const uploadData = await uploadRes.json();
        finalImageUrl = uploadData.url;
      }

      const postData = { ...formData, featuredImage: finalImageUrl };

      const url = post ? `/api/posts/${post.id}` : '/api/posts';
      const method = post ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        throw new Error('Failed to save post');
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/80 dark:bg-[#111]/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
      {/* ... previous content got accidentally removed, restoring the basic structure since it's just a return fix ... */}
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2 border border-red-100">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {/* Title & Type */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium">Title</label>
          <input
            type="text"
            required
            placeholder="A Long Title Often Requires Thought"
            className="w-full text-2xl md:text-3xl font-serif p-4 bg-transparent border-b-2 border-gray-200 dark:border-gray-800 focus:border-black dark:focus:border-white outline-none transition-colors placeholder:text-gray-300 dark:placeholder:text-gray-700"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div className="w-full md:w-64 space-y-2">
          <label className="text-sm font-medium">Genre</label>
          <select
            className="w-full p-4 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-shadow"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="poetry">Poetry</option>
            <option value="story">Short Story</option>
          </select>
        </div>
      </div>

      {/* Featured Image */}
      <div className="space-y-2 border-b border-gray-100 dark:border-gray-800 pb-8">
        <label className="text-sm font-medium">Featured Image Header</label>
        <p className="text-xs text-gray-500 mb-2">Upload a high-quality image from your PC to feature at the top of the post.</p>
        <input
          type="file"
          accept="image/*"
          className="w-full p-3 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-shadow"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setFileToUpload(file);
              const objectUrl = URL.createObjectURL(file);
              setPreviewUrl(objectUrl);
            }
          }}
        />
        {(previewUrl || formData.featuredImage) && (
          <div className="mt-4 w-full h-48 md:h-64 rounded-xl overflow-hidden bg-gray-100 relative group border border-gray-200 dark:border-gray-800">
            <img src={previewUrl || formData.featuredImage} alt="Featured Preview" className="object-cover w-full h-full" />
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={() => {
                  setFileToUpload(null);
                  setPreviewUrl('');
                  setFormData({ ...formData, featuredImage: '' });
                }}
                className="bg-red-500/90 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm transition-colors"
              >
                Remove Image
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Editor component */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <label className="text-sm font-medium">Content Body</label>
          <span className="text-xs text-gray-500 font-medium px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md">Rich Text Editing Enabled</span>
        </div>
        <div className="relative z-0">
          <Editor
            content={formData.content}
            onChange={(content: string) => setFormData({ ...formData, content })}
          />
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col-reverse sm:flex-row justify-end gap-3 items-center">
        <label className="flex items-center gap-3 cursor-pointer group mr-auto">
          <div className={`w-12 h-6 rounded-full transition-colors relative ${formData.published ? 'bg-black dark:bg-white' : 'bg-gray-200 dark:bg-gray-800'}`}>
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white dark:bg-black transition-all ${formData.published ? 'left-7' : 'left-1'}`}></div>
          </div>
          <span className="font-medium text-sm group-hover:opacity-80 transition-opacity">
            {formData.published ? 'Published' : 'Draft'}
          </span>
          <input
            type="checkbox"
            className="hidden"
            checked={formData.published}
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
          />
        </label>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black font-medium rounded-xl hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50 disabled:scale-100 shadow-lg shadow-black/10 dark:shadow-white/10"
        >
          <Save size={18} />
          {loading ? 'Saving...' : (post ? 'Update Post' : 'Save Post')}
        </button>
      </div>
    </form>
  );
}
