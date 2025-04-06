/*
  Warnings:

  - You are about to drop the column `tournamentTypeId` on the `tournaments` table. All the data in the column will be lost.
  - Added the required column `tournament_typesId` to the `tournaments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tournaments" DROP CONSTRAINT "tournaments_tournamentTypeId_fkey";

-- AlterTable
ALTER TABLE "tournaments" DROP COLUMN "tournamentTypeId",
ADD COLUMN     "tournament_typesId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_tournament_typesId_fkey" FOREIGN KEY ("tournament_typesId") REFERENCES "tournament_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
