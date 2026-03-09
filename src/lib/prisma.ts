import { PrismaClient } from '@prisma/client';
import { createClient } from '@libsql/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

const createPrismaClient = () => {
    const url = process.env.DATABASE_URL || 'file:./dev.db';

    // If it's a remote Turso URL, use the libSQL adapter
    if (url.startsWith('libsql://') || url.startsWith('https://')) {
        const libsql = createClient({
            url,
            authToken: process.env.TURSO_AUTH_TOKEN,
        });
        const adapter = new PrismaLibSQL(libsql);
        // @ts-ignore - Prisma types might complain about adapter depending on version, but it works
        return new PrismaClient({ adapter });
    }

    // Fallback to standard local SQLite
    return new PrismaClient();
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
