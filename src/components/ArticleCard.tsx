import Link from 'next/link';

interface ArticleCardProps {
    title: string;
    excerpt: string;
    date: string;
    href: string;
    genre: string;
    featuredImage?: string | null;
}

function calculateReadingTime(text: string): number {
    const wpm = 225;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return time || 1;
}

export function ArticleCard({ title, excerpt, date, href, genre, featuredImage }: ArticleCardProps) {
    // Strip HTML completely for excerpt and word count
    const cleanExcerptText = excerpt.replace(/<[^>]*>?/gm, '');
    const displayExcerpt = cleanExcerptText.substring(0, 160) + (cleanExcerptText.length > 160 ? '...' : '');
    const readTime = calculateReadingTime(cleanExcerptText);

    return (
        <Link href={href} className="group block h-full">
            <div className="flex flex-col h-full overflow-hidden rounded-2xl bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5 transition-all duration-300 hover:-translate-y-1">

                {/* Featured Image */}
                <div className="w-full h-48 sm:h-56 bg-gray-100 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 overflow-hidden relative">
                    {featuredImage ? (
                        <img
                            src={featuredImage}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                        />
                    ) : (
                        // Fallback gradient if no image is provided
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 opacity-50" />
                    )}

                    {/* Genre Badge */}
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-white/90 dark:bg-black/90 text-black dark:text-white rounded-full backdrop-blur-sm shadow-sm ring-1 ring-black/5 dark:ring-white/10">
                            {genre}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                    <h2 className="text-2xl font-serif font-medium mb-3 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors line-clamp-2">
                        {title}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                        {displayExcerpt}
                    </p>

                    {/* Footer Metadata */}
                    <div className="flex items-center justify-between text-xs text-gray-500 font-medium pt-4 border-t border-gray-100 dark:border-gray-800/50 mt-auto">
                        <time dateTime={date}>{date}</time>
                        <div className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                            <span>{readTime} min read</span>
                        </div>
                    </div>
                </div>

            </div>
        </Link>
    );
}
