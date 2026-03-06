import { prisma } from '@/lib/prisma';
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  MessageCircle,
  Video
} from 'lucide-react'; // Fallback icons

export async function Footer() {
  const socials = await prisma.siteSettings.findUnique({ where: { id: 'singleton' } });

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-20 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} Writer's Name. All rights reserved.</p>
        
        <div className="flex gap-6 mt-4 md:mt-0">
          {socials?.instagram && (
            <a href={socials.instagram} target="_blank" aria-label="Instagram" className="hover:text-black dark:hover:text-white transition-colors">
              <Instagram size={18} />
            </a>
          )}
          {socials?.twitter && (
            <a href={socials.twitter} target="_blank" aria-label="X (Twitter)" className="hover:text-black dark:hover:text-white transition-colors">
              <Twitter size={18} />
            </a>
          )}
          {socials?.facebook && (
            <a href={socials.facebook} target="_blank" aria-label="Facebook" className="hover:text-black dark:hover:text-white transition-colors">
              <Facebook size={18} />
            </a>
          )}
          {socials?.tiktok && (
            <a href={socials.tiktok} target="_blank" aria-label="TikTok" className="hover:text-black dark:hover:text-white transition-colors">
              <Video size={18} />
            </a>
          )}
          {socials?.snapchat && (
            <a href={socials.snapchat} target="_blank" aria-label="Snapchat" className="hover:text-black dark:hover:text-white transition-colors">
              <div className="font-semibold text-xs tracking-tighter">SNAP</div>
            </a>
          )}
          {socials?.whatsapp && (
            <a href={`https://wa.me/${socials.whatsapp.replace(/\D/g, '')}`} target="_blank" aria-label="WhatsApp" className="hover:text-black dark:hover:text-white transition-colors">
              <MessageCircle size={18} />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
