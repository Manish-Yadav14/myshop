/*
  Warnings:

  - You are about to drop the `_CategoryToProduct` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,productId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToProduct" DROP CONSTRAINT "_CategoryToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToProduct" DROP CONSTRAINT "_CategoryToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_CategoryToProduct";

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_userId_productId_key" ON "CartItem"("userId", "productId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
