-- CreateTable
CREATE TABLE "Epic" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Epic name',

    CONSTRAINT "Epic_pkey" PRIMARY KEY ("id")
);
