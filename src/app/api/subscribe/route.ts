import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email || !email.includes('@')) {
            return NextResponse.json({ message: 'Invalid email address' }, { status: 400 });
        }

        // Check if subscriber exists
        const existingSubscriber = await prisma.subscriber.findUnique({
            where: { email }
        });

        if (existingSubscriber) {
            return NextResponse.json({ message: 'You are already subscribed!' }, { status: 409 });
        }

        // Create new subscriber
        await prisma.subscriber.create({
            data: { email }
        });

        return NextResponse.json({ message: 'Successfully subscribed to the newsletter!' }, { status: 201 });
    } catch (error) {
        console.error("POST /api/subscribe error:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
