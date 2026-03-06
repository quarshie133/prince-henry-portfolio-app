import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

function generateSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Math.random().toString(36).substring(2, 8);
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const data = await req.json();
        const { title, content, type, published } = data;

        if (!title || !content || !type) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const post = await prisma.post.create({
            data: {
                title,
                content,
                type,
                published: !!published,
                slug: generateSlug(title)
            }
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error("POST /api/posts error:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const data = await req.json();
        const { id, title, content, type, published } = data;

        if (!id || !title || !content || !type) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const post = await prisma.post.update({
            where: { id },
            data: {
                title,
                content,
                type,
                published: !!published,
            }
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error("PUT /api/posts error:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
