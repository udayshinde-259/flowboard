/*
  Warnings:

  - You are about to drop the column `cardId` on the `Card` table. All the data in the column will be lost.
  - Added the required column `boardId` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_cardId_fkey";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "cardId",
ADD COLUMN     "boardId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Boards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
