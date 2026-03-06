'use client';

import { motion, Variants } from 'framer-motion';
import { BookOpen, FileText, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';

interface Stat {
  title: string;
  value: number;
  icon: string;
  trend?: string;
  color: string;
  textColor: string;
}

const iconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen size={20} />,
  FileText: <FileText size={20} />,
  CheckCircle: <CheckCircle size={20} />,
  Clock: <Clock size={20} />
};

export default function DashboardOverviewClient({ stats }: { stats: Stat[] }) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 300, damping: 24 } 
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-serif font-medium mb-2">Overview</h1>
        <p className="text-gray-500">Welcome back to your writer's dashboard.</p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, i) => (
          <motion.div key={i} variants={itemVariants} className="relative group">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="relative bg-white/80 dark:bg-[#111]/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all h-full">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-gray-50 dark:bg-[#0a0a0a] ${stat.textColor}`}>
                  {iconMap[stat.icon]}
                </div>
                <div className="text-3xl font-serif font-medium tracking-tight text-gray-900 dark:text-white">
                  {stat.value}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</h3>
                {stat.trend && <p className="text-xs text-gray-400 mt-1">{stat.trend}</p>}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/80 dark:bg-[#111]/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-32 bg-gradient-to-bl from-gray-100 to-transparent dark:from-gray-900 dark:to-transparent rounded-full blur-3xl opacity-50 pointer-events-none" />
        
        <div className="relative z-10">
          <h2 className="text-xl font-serif font-medium mb-2">Quick Actions</h2>
          <p className="text-gray-500 text-sm mb-6">What would you like to create today?</p>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/dashboard/poetry/new" className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-medium rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-black/10 dark:shadow-white/10">
              <BookOpen size={18} /> Write Poem
            </Link>
            <Link href="/dashboard/stories/new" className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-medium rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
              <FileText size={18} /> Write Story
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
