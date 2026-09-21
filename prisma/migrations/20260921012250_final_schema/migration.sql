/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the `Issues` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cardId` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Issues" DROP CONSTRAINT "Issues_cardId_fkey";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "createdAt",
DROP COLUMN "organizationId",
DROP COLUMN "updatedAt",
ADD COLUMN     "cardId" TEXT NOT NULL,
ADD COLUMN     "description" TEXT;

-- DropTable
DROP TABLE "Issues";

-- CreateTable
CREATE TABLE "Boards" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Boards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Boards" ADD CONSTRAINT "Boards_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Boards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
