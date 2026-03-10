import { prisma } from '@/lib/prisma';
import { HeroAnimatedContent } from '@/components/HeroAnimatedContent';

export default async function Home() {
  let settings = null;
  
  try {
    settings = await prisma.siteSettings.findUnique({
      where: { id: 'singleton' }
    });
  } catch (error) {
    console.error("Failed to fetch site settings:", error);
  }

  const heroTitle = settings?.heroTitle || "Words that resonate. Stories that endure.";
  const heroSub = settings?.heroSub || "A space where poetry, stories, and reflections come to life.";

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white">
      <HeroAnimatedContent heroTitle={heroTitle} heroSub={heroSub} />
    </div>
  );
}
