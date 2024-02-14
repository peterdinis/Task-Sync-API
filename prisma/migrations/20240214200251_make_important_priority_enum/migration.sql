/*
  Warnings:

  - Changed the type of `imporatntPriority` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ImporatntPriority" AS ENUM ('Low', 'Medium', 'High', 'Extreme');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "imporatntPriority",
ADD COLUMN     "imporatntPriority" "ImporatntPriority" NOT NULL;
