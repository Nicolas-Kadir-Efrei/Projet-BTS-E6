/*
  Warnings:

  - You are about to alter the column `teamName` on the `teams` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to drop the column `game` on the `tournaments` table. All the data in the column will be lost.
  - You are about to drop the column `tournamentType` on the `tournaments` table. All the data in the column will be lost.
  - You are about to alter the column `tournamentName` on the `tournaments` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `startTime` on the `tournaments` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(5)`.
  - You are about to alter the column `format` on the `tournaments` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `rewards` on the `tournaments` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Added the required column `gameId` to the `tournaments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tournamentTypeId` to the `tournaments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "teams" ALTER COLUMN "teamName" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "tournaments" DROP COLUMN "game",
DROP COLUMN "tournamentType",
ADD COLUMN     "gameId" INTEGER NOT NULL,
ADD COLUMN     "tournamentTypeId" INTEGER NOT NULL,
ALTER COLUMN "tournamentName" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "startTime" SET DATA TYPE VARCHAR(5),
ALTER COLUMN "format" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "rewards" SET DATA TYPE VARCHAR(255);

-- CreateTable
CREATE TABLE "games" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tournament_types" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(50) NOT NULL,

    CONSTRAINT "tournament_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "games_name_key" ON "games"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tournament_types_type_key" ON "tournament_types"("type");

-- AddForeignKey
ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_tournamentTypeId_fkey" FOREIGN KEY ("tournamentTypeId") REFERENCES "tournament_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
