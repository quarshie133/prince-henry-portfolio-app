'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateHeroSettings(formData: FormData) {
    const heroTitle = (formData.get('heroTitle') as string) || '';
    const heroSub = (formData.get('heroSub') as string) || '';

    await prisma.siteSettings.upsert({
        where: { id: 'singleton' },
        update: { heroTitle, heroSub },
        create: { id: 'singleton', heroTitle, heroSub },
    });

    revalidatePath('/dashboard/settings/hero');
    revalidatePath('/');
}

export async function updateAboutSettings(formData: FormData) {
    const aboutText = (formData.get('aboutText') as string) || '';
    const aboutImage = (formData.get('aboutImage') as string) || null;

    await prisma.siteSettings.upsert({
        where: { id: 'singleton' },
        update: { aboutText, aboutImage },
        create: { id: 'singleton', aboutText, aboutImage },
    });

    revalidatePath('/dashboard/settings/about');
    revalidatePath('/about');
}

export async function updateSocialSettings(formData: FormData) {
    const data = {
        instagram: formData.get('instagram') as string || null,
        twitter: formData.get('twitter') as string || null,
        medium: formData.get('medium') as string || null,
        substack: formData.get('substack') as string || null,
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

export async function updateAppearanceSettings(formData: FormData) {
    const heroBgImage = formData.get('heroBgImage') as string || null;

    await prisma.siteSettings.upsert({
        where: { id: 'singleton' },
        update: { heroBgImage },
        create: { id: 'singleton', heroBgImage },
    });

    revalidatePath('/dashboard/settings/appearance');
    revalidatePath('/');
}
