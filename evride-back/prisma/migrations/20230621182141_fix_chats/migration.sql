/*
  Warnings:

  - You are about to drop the column `listingId` on the `Message` table. All the data in the column will be lost.
  - Added the required column `buyerId` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `listingId` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellerId` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chatId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_listingId_fkey";

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "buyerId" INTEGER NOT NULL,
ADD COLUMN     "listingId" INTEGER NOT NULL,
ADD COLUMN     "sellerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "listingId",
ADD COLUMN     "chatId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
