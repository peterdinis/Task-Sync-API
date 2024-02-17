/*
  Warnings:

  - You are about to drop the column `isImportant` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `TaskBlock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TaskRound` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TaskTimer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TaskBlock" DROP CONSTRAINT "TaskBlock_userId_fkey";

-- DropForeignKey
ALTER TABLE "TaskRound" DROP CONSTRAINT "TaskRound_taskTimerId_fkey";

-- DropForeignKey
ALTER TABLE "TaskTimer" DROP CONSTRAINT "TaskTimer_userId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "isImportant",
ADD COLUMN     "isDone" BOOLEAN,
ADD COLUMN     "startWorkingOnTask" BOOLEAN DEFAULT false,
ADD COLUMN     "totalSec" INTEGER DEFAULT 0;

-- DropTable
DROP TABLE "TaskBlock";

-- DropTable
DROP TABLE "TaskRound";

-- DropTable
DROP TABLE "TaskTimer";
