import { prisma } from '@/lib/prisma';
import { Mail, CalendarDays } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import ExportCsvButton from '@/components/ExportCsvButton';

export const dynamic = 'force-dynamic';

export default async function SubscribersPage() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/dashboard/login');
    }

    const subscribers = await prisma.subscriber.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="pb-6 border-b border-gray-200 dark:border-gray-800">
                <h1 className="text-3xl font-serif font-medium mb-2">Newsletter Subscribers</h1>
                <p className="text-gray-500">View and manage all readers who have subscribed to your newsletter.</p>
            </div>

            <div className="bg-white dark:bg-[#111] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 rounded-2xl">
                {subscribers.length === 0 ? (
                    <div className="p-12 text-center flex flex-col items-center">
                        <Mail size={48} className="text-gray-300 dark:text-gray-700 mb-4" strokeWidth={1} />
                        <h3 className="text-xl font-medium mb-2">No subscribers yet</h3>
                        <p className="text-gray-500 max-w-sm">When readers subscribe to your newsletter through the contact page, their email addresses will appear here.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 text-gray-500">
                                <tr>
                                    <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs flex items-center gap-2">
                                        <Mail size={14} /> Email Address
                                    </th>
                                    <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">
                                        <div className="flex items-center gap-2">
                                            <CalendarDays size={14} /> Subscribed On
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {subscribers.map((sub: any) => (
                                    <tr key={sub.id} className="hover:bg-gray-50 dark:hover:bg-[#161616] transition-colors">
                                        <td className="px-6 py-4 font-medium">
                                            {sub.email}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {new Date(sub.createdAt).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Subscriber Count Summary */}
            <div className="flex justify-between items-center text-sm text-gray-500 px-2 mt-4">
                <span>Total Subscribers: <strong className="text-black dark:text-white font-medium">{subscribers.length}</strong></span>
                <ExportCsvButton subscribers={subscribers} />
            </div>
        </div>
    );
}
