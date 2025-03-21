-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'GUEST');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
ALTER COLUMN "verificationToken" SET DEFAULT NULL;
