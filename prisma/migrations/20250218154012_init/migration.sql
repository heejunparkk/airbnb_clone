-- CreateTable
CREATE TABLE "Accommodation" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "images" TEXT[],
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Accommodation_pkey" PRIMARY KEY ("id")
);

-- rating 필드 타입 변경
ALTER TABLE "Accommodation" ALTER COLUMN "rating" TYPE FLOAT USING rating::FLOAT;

-- 새로운 필드 추가
ALTER TABLE "Accommodation" ADD COLUMN "baths" INTEGER NOT NULL DEFAULT 1;
ALTER TABLE "Accommodation" ADD COLUMN "bedrooms" INTEGER NOT NULL DEFAULT 1;
ALTER TABLE "Accommodation" ADD COLUMN "beds" INTEGER NOT NULL DEFAULT 1;
ALTER TABLE "Accommodation" ADD COLUMN "maxGuests" INTEGER NOT NULL DEFAULT 2;
ALTER TABLE "Accommodation" ADD COLUMN "amenities" TEXT[] DEFAULT '{}';
