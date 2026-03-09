import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/80 backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl font-medium tracking-tight hover:opacity-80 transition-opacity">
          Nibenang Prince Henry.
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
            About
          </Link>
          <Link href="/poetry" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
            Poetry
          </Link>
          <Link href="/stories" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
            Short Stories
          </Link>
          <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {/* Mobile menu could go here */}
          <div className="md:hidden">
            {/* Simple menu icon placeholder */}
            <button className="p-2 -mr-2 text-gray-600 dark:text-gray-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
