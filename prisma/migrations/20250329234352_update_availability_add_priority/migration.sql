/*
  Warnings:

  - The `availability` column on the `Service` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AvailabilityStatus" AS ENUM ('AVAILABLE', 'UNAVAILABLE', 'MAINTENANCE');

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "availability",
ADD COLUMN     "availability" "AvailabilityStatus" NOT NULL DEFAULT 'AVAILABLE';
