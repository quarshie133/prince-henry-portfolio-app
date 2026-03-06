import { PostForm } from '@/components/PostForm';

export default function NewStoryPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create New Story</h1>
      <PostForm type="story" />
    </div>
  );
}
