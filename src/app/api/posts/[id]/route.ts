import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        const { title, content, type, published, featuredImage } = body;

        if (!title || !content || !type) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const post = await prisma.post.update({
            where: { id },
            data: {
                title,
                content,
                type,
                published: !!published,
                featuredImage: featuredImage || null,
            }
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error(`PUT /api/posts/[id] error:`, error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
