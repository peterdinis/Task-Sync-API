/*
  Warnings:

  - Added the required column `ownerUsername` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "ownerUsername" TEXT NOT NULL;
