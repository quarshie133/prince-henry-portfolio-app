-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'singleton',
    "heroTitle" TEXT NOT NULL DEFAULT 'Words that resonate, stories that endure.',
    "heroSub" TEXT NOT NULL DEFAULT 'Welcome to my digital garden. I write about poetry, technology, and the spaces in between.',
    "aboutText" TEXT NOT NULL DEFAULT 'Hello. I''m a writer bridging the gap between digital thoughts and tangible feelings.',
    "aboutImage" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "facebook" TEXT,
    "tiktok" TEXT,
    "snapchat" TEXT,
    "whatsapp" TEXT DEFAULT '+233 55 659 7805',
    "updatedAt" DATETIME NOT NULL
);
