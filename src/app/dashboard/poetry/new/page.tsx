import { PostForm } from '@/components/PostForm';

export default function NewPoetryPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create New Poetry</h1>
      <PostForm post={{ type: 'poetry' }} />
    </div>
  );
}
