'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function HeroAnimatedContent({ heroTitle, heroSub }: { heroTitle: string, heroSub: string }) {
  return (
    <>
      {/* Background Image with Zoom Animation */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat w-full h-full"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1455390582262-044cdead27d8?q=80&w=2873&auto=format&fit=crop")',
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      />
      
      {/* Static Subtly-blurred Overlay */}
      <div className="absolute inset-0 z-[1] bg-black/50 backdrop-blur-[2px] pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <h1 
            className="text-4xl md:text-5xl lg:text-7xl font-serif font-medium tracking-tight mb-6 text-white drop-shadow-lg leading-tight"
            dangerouslySetInnerHTML={{ __html: heroTitle.replace(/\n/g, '<br />') }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-lg md:text-2xl text-gray-300 font-serif font-light mb-12 tracking-wide leading-relaxed">
            {heroSub}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex gap-6 sm:gap-8 items-center"
        >
          <Link
            href="/poetry"
            className="group relative px-6 py-2 text-sm md:text-base font-medium uppercase tracking-widest overflow-hidden"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
              Poetry
            </span>
            <div className="absolute inset-0 h-full w-full bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-0"></div>
            <div className="absolute bottom-0 left-0 h-[1px] w-full bg-white/50"></div>
          </Link>

          <Link
            href="/stories"
            className="group relative px-6 py-2 text-sm md:text-base font-medium uppercase tracking-widest overflow-hidden"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
              Stories
            </span>
            <div className="absolute inset-0 h-full w-full bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-0"></div>
            <div className="absolute bottom-0 left-0 h-[1px] w-full bg-white/50"></div>
          </Link>
        </motion.div>
      </div>
    </>
  );
}
