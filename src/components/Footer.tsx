import { prisma } from '@/lib/prisma';
import {
  Instagram,
  Twitter,
  Facebook,
  MessageCircle,
  Video
} from 'lucide-react'; // Fallback icons

export async function Footer() {
  let socials = null;

  try {
    socials = await prisma.siteSettings.findUnique({ where: { id: 'singleton' } });
  } catch (error) {
    console.error("Skipping DB fetch for Footer: Database is unreachable.");
  }

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-20 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row justify-between items-center md:items-start gap-8 text-sm text-gray-500 dark:text-gray-400">
        
        {/* Author Info & Developer Credits */}
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <h3 className="font-serif text-xl font-medium text-black dark:text-white mb-1">Nibenang Prince Henry</h3>
          <a href="mailto:henrynibenang@yahoo.com" className="hover:text-black dark:hover:text-white transition-colors">
            henrynibenang@yahoo.com
          </a>
          <div className="mt-6 flex flex-col gap-1">
            <p className="text-xs">© {new Date().getFullYear()} Nibenang Prince Henry. All rights reserved.</p>
            <p className="text-xs">Develop by noqtech solutions</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <span className="font-medium text-black dark:text-white hidden md:block">Connect</span>
          <div className="flex gap-6 items-center">
            {socials?.instagram && (
              <a href={socials.instagram} target="_blank" aria-label="Instagram" className="hover:text-black dark:hover:text-white hover:-translate-y-1 transition-all duration-300">
                <Instagram size={20} />
              </a>
            )}
            {socials?.twitter && (
              <a href={socials.twitter} target="_blank" aria-label="X (Twitter)" className="hover:text-black dark:hover:text-white hover:-translate-y-1 transition-all duration-300">
                <Twitter size={20} />
              </a>
            )}
            {socials?.facebook && (
              <a href={socials.facebook} target="_blank" aria-label="Facebook" className="hover:text-black dark:hover:text-white hover:-translate-y-1 transition-all duration-300">
                <Facebook size={20} />
              </a>
            )}
            {socials?.tiktok && (
              <a href={socials.tiktok} target="_blank" aria-label="TikTok" className="hover:text-black dark:hover:text-white hover:-translate-y-1 transition-all duration-300">
                <Video size={20} />
              </a>
            )}
            {socials?.snapchat && (
              <a href={socials.snapchat} target="_blank" aria-label="Snapchat" className="hover:text-black dark:hover:text-white hover:-translate-y-1 transition-all duration-300">
                <div className="font-semibold text-sm tracking-tighter">SNAP</div>
              </a>
            )}
            {socials?.whatsapp && (
              <a href={`https://wa.me/${socials.whatsapp.replace(/\D/g, '')}`} target="_blank" aria-label="WhatsApp" className="hover:text-black dark:hover:text-white hover:-translate-y-1 transition-all duration-300">
                <MessageCircle size={20} />
              </a>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
}
