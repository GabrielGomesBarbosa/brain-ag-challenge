/*
  Warnings:

  - You are about to drop the column `ruralProducerId` on the `Crop` table. All the data in the column will be lost.
  - You are about to drop the column `cropId` on the `RuralProducer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Crop" DROP CONSTRAINT "Crop_ruralProducerId_fkey";

-- AlterTable
ALTER TABLE "Crop" DROP COLUMN "ruralProducerId";

-- AlterTable
ALTER TABLE "RuralProducer" DROP COLUMN "cropId";
