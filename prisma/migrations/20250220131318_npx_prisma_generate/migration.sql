/*
  Warnings:

  - The primary key for the `Accommodation` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Accommodation" DROP CONSTRAINT "Accommodation_pkey",
ADD COLUMN     "checkInTime" TEXT NOT NULL DEFAULT '15:00',
ADD COLUMN     "checkOutTime" TEXT NOT NULL DEFAULT '11:00',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "baths" DROP DEFAULT,
ALTER COLUMN "bedrooms" DROP DEFAULT,
ALTER COLUMN "beds" DROP DEFAULT,
ALTER COLUMN "maxGuests" DROP DEFAULT,
ALTER COLUMN "amenities" DROP DEFAULT,
ADD CONSTRAINT "Accommodation_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Accommodation_id_seq";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profileImage" TEXT,
    "phoneNumber" TEXT,
    "isHost" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
