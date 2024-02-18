/*
  Warnings:

  - You are about to drop the column `breakCount` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `intervalBreaks` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `workCount` on the `User` table. All the data in the column will be lost.
  - Added the required column `isForEpic` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "isForEpic" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "breakCount",
DROP COLUMN "intervalBreaks",
DROP COLUMN "workCount";
