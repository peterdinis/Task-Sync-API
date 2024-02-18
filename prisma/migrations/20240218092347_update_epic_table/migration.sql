/*
  Warnings:

  - Added the required column `projectId` to the `Epic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Epic" ADD COLUMN     "description" TEXT,
ADD COLUMN     "isFinished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "projectId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Epic" ADD CONSTRAINT "Epic_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
