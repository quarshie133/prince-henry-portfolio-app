'use client';

import { Download } from 'lucide-react';
import { useState } from 'react';

interface Subscriber {
    id: string;
    email: string;
    createdAt: Date;
}

export default function ExportCsvButton({ subscribers }: { subscribers: Subscriber[] }) {
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = () => {
        setIsExporting(true);
        try {
            // Create CSV headers
            const headers = ['Email', 'Subscribed Date'];
            
            // Create CSV rows
            const rows = subscribers.map(sub => [
                sub.email,
                new Date(sub.createdAt).toISOString()
            ]);
            
            // Combine headers and rows
            const csvContent = [
                headers.join(','),
                ...rows.map(row => row.join(','))
            ].join('\n');
            
            // Create a blob and trigger download
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            
            link.setAttribute('href', url);
            link.setAttribute('download', `subscribers_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Failed to export CSV', error);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <button 
            onClick={handleExport}
            disabled={subscribers.length === 0 || isExporting}
            className="px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors disabled:opacity-50 flex items-center gap-2"
        >
            <Download size={16} />
            {isExporting ? 'Exporting...' : 'Export CSV'}
        </button>
    );
}
