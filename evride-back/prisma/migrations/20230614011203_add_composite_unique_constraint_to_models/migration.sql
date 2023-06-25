/*
  Warnings:

  - A unique constraint covering the columns `[brandId,name]` on the table `Model` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Model_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Model_brandId_name_key" ON "Model"("brandId", "name");
