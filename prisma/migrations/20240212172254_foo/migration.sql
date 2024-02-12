/*
  Warnings:

  - Added the required column `userId` to the `TaskBlock` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "TaskRound" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "totalSec" INTEGER NOT NULL,
    "isDone" BOOLEAN,
    "taskTimerId" TEXT NOT NULL,
    CONSTRAINT "TaskRound_taskTimerId_fkey" FOREIGN KEY ("taskTimerId") REFERENCES "TaskTimer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TaskBlock" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "duration" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 1,
    "userId" TEXT NOT NULL,
    CONSTRAINT "TaskBlock_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TaskBlock" ("color", "createdAt", "duration", "id", "name", "order", "updatedAt") SELECT "color", "createdAt", "duration", "id", "name", "order", "updatedAt" FROM "TaskBlock";
DROP TABLE "TaskBlock";
ALTER TABLE "new_TaskBlock" RENAME TO "TaskBlock";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
