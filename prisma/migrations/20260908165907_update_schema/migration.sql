/*
  Warnings:

  - You are about to drop the column `cardId` on the `Issues` table. All the data in the column will be lost.
  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `boardId` to the `Issues` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_boardId_fkey";

-- DropForeignKey
ALTER TABLE "Issues" DROP CONSTRAINT "Issues_cardId_fkey";

-- AlterTable
ALTER TABLE "Issues" DROP COLUMN "cardId",
ADD COLUMN     "boardId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Card";

-- AddForeignKey
ALTER TABLE "Issues" ADD CONSTRAINT "Issues_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
