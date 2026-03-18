export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

function generateSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Math.random().toString(36).substring(2, 8);
}

export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(posts);
    } catch (error) {
        console.error("GET /api/posts error:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { title, content, type, published, featuredImage } = body;

        if (!title || !content || !type) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const slug = generateSlug(title);

        const post = await prisma.post.create({
            data: {
                title,
                slug,
                content,
                type,
                published: published ?? false,
                featuredImage: featuredImage || null,
            },
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error("POST /api/posts error:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

 
