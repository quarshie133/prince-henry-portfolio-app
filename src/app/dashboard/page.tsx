import { prisma } from '@/lib/prisma';
import { BookOpen, FileText, CheckCircle, Clock } from 'lucide-react';
import DashboardOverviewClient from './DashboardOverviewClient';

export default async function DashboardOverview() {
  const [totalPoetry, totalStories, publishedPosts, drafts] = await Promise.all([
    prisma.post.count({ where: { type: 'poetry' } }),
    prisma.post.count({ where: { type: 'story' } }),
    prisma.post.count({ where: { published: true } }),
    prisma.post.count({ where: { published: false } }),
  ]);

  const stats = [
    { title: "Total Poetry", value: totalPoetry, icon: "BookOpen", color: "from-blue-500/20 to-purple-500/20", textColor: "text-blue-500" },
    { title: "Short Stories", value: totalStories, icon: "FileText", color: "from-emerald-500/20 to-teal-500/20", textColor: "text-emerald-500" },
    { title: "Published", value: publishedPosts, icon: "CheckCircle", trend: "Live on site", color: "from-orange-500/20 to-red-500/20", textColor: "text-orange-500" },
    { title: "Drafts", value: drafts, icon: "Clock", trend: "Needs work", color: "from-gray-500/20 to-slate-500/20", textColor: "text-gray-500" }
  ];

  return <DashboardOverviewClient stats={stats} />;
}
