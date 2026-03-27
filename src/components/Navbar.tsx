'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/poetry', label: 'Poetry' },
  { href: '/stories', label: 'Short Stories' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/80 backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-serif text-xl font-medium tracking-tight hover:opacity-80 transition-opacity" onClick={() => setMenuOpen(false)}>
          Nibenang Prince Henry.
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors ${pathname === link.href ? 'text-black dark:text-white font-semibold' : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Hamburger Button (mobile only) */}
          <button
            className="md:hidden p-2 -mr-1 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-gray-100 dark:bg-gray-900 text-black dark:text-white font-semibold'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-black dark:hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
