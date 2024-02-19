/*
  Warnings:

  - Made the column `description` on table `Epic` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Epic" ALTER COLUMN "description" SET NOT NULL;
