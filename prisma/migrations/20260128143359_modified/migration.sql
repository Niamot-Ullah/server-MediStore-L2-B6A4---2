/*
  Warnings:

  - You are about to drop the column `isActive` on the `medicines` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "medicines" DROP COLUMN "isActive",
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT true;
