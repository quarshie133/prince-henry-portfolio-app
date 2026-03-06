'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateHeroSettings(formData: FormData) {
    const heroTitle = formData.get('heroTitle') as string;
    const heroSub = formData.get('heroSub') as string;

    await prisma.siteSettings.upsert({
        where: { id: 'singleton' },
        update: { heroTitle, heroSub },
        create: { id: 'singleton', heroTitle, heroSub },
    });

    revalidatePath('/dashboard/settings/hero');
    revalidatePath('/');
}

export async function updateAboutSettings(formData: FormData) {
    const aboutText = formData.get('aboutText') as string;

    await prisma.siteSettings.upsert({
        where: { id: 'singleton' },
        update: { aboutText },
        create: { id: 'singleton', aboutText },
    });

    revalidatePath('/dashboard/settings/about');
    revalidatePath('/about');
}

export async function updateSocialSettings(formData: FormData) {
    const data = {
        instagram: formData.get('instagram') as string || null,
        twitter: formData.get('twitter') as string || null,
        facebook: formData.get('facebook') as string || null,
        tiktok: formData.get('tiktok') as string || null,
        snapchat: formData.get('snapchat') as string || null,
        whatsapp: formData.get('whatsapp') as string || null,
    };

    await prisma.siteSettings.upsert({
        where: { id: 'singleton' },
        update: data,
        create: { id: 'singleton', ...data },
    });

    revalidatePath('/dashboard/settings/socials');
    revalidatePath('/');
    revalidatePath('/about');
}
