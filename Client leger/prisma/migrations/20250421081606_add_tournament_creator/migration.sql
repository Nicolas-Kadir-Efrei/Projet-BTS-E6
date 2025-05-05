/*
  Warnings:

  - Added the required column `createdById` to the `tournaments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tournaments" ADD COLUMN     "createdById" INTEGER;
UPDATE "tournaments" SET "createdById" = 1; 
ALTER TABLE "tournaments" ALTER COLUMN "createdById" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
