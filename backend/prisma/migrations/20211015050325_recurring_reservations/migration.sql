/*
  Warnings:

  - The `startTimestamp` column on the `Reservation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `endTimestamp` column on the `Reservation` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "startTimestamp",
ADD COLUMN     "startTimestamp" TIMESTAMP(3)[],
DROP COLUMN "endTimestamp",
ADD COLUMN     "endTimestamp" TIMESTAMP(3)[];
