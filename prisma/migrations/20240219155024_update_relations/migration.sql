-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_epicId_fkey";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_epicId_fkey" FOREIGN KEY ("epicId") REFERENCES "Epic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
