import { prisma } from '@/lib/prisma';
import {
  FaInstagram,
  FaXTwitter,
  FaFacebookF,
  FaTiktok,
  FaSnapchat,
  FaWhatsapp
} from 'react-icons/fa6';

export async function Footer() {
  let socials = null;

  try {
    socials = await prisma.siteSettings.findUnique({ where: { id: 'singleton' } });
  } catch (error) {
    console.error("Skipping DB fetch for Footer: Database is unreachable.");
  }

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-12 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center gap-6">
        
        {/* Social Links */}
        <div className="flex gap-4 items-center flex-wrap justify-center">
          {socials?.instagram && (
            <a href={socials.instagram} target="_blank" aria-label="Instagram" className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white hover:-translate-y-1 transition-all duration-300">
              <FaInstagram size={20} />
            </a>
          )}
          {socials?.twitter && (
            <a href={socials.twitter} target="_blank" aria-label="X (Twitter)" className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white hover:-translate-y-1 transition-all duration-300">
              <FaXTwitter size={20} />
            </a>
          )}
          {socials?.facebook && (
            <a href={socials.facebook} target="_blank" aria-label="Facebook" className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white hover:-translate-y-1 transition-all duration-300">
              <FaFacebookF size={20} />
            </a>
          )}
          {socials?.tiktok && (
            <a href={socials.tiktok} target="_blank" aria-label="TikTok" className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white hover:-translate-y-1 transition-all duration-300">
              <FaTiktok size={20} />
            </a>
          )}
          {socials?.snapchat && (
            <a href={socials.snapchat} target="_blank" aria-label="Snapchat" className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white hover:-translate-y-1 transition-all duration-300">
              <FaSnapchat size={20} />
            </a>
          )}
          {socials?.whatsapp && (
            <a href={`https://wa.me/${socials.whatsapp.replace(/\D/g, '')}`} target="_blank" aria-label="WhatsApp" className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white hover:-translate-y-1 transition-all duration-300">
              <FaWhatsapp size={20} />
            </a>
          )}
        </div>

        {/* Developer Credits */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-sm text-gray-500 dark:text-gray-400 font-serif tracking-wide">
          <span>Developed by Noqtech Solutions</span>
          <span className="hidden md:inline text-gray-300 dark:text-gray-700">|</span>
          <span>Visual Design</span>
        </div>
        
      </div>
    </footer>
  );
}
