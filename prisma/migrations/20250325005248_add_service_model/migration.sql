-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT,
    "technicalCharacteristics" TEXT,
    "companyBenefits" TEXT,
    "category" TEXT,
    "monthlyPrice" DECIMAL(10,2) NOT NULL,
    "annualPrice" DECIMAL(10,2) NOT NULL,
    "perUserPrice" DECIMAL(10,2) NOT NULL,
    "perDevicePrice" DECIMAL(10,2) NOT NULL,
    "maxResources" INTEGER NOT NULL,
    "availability" TEXT NOT NULL DEFAULT 'disponible',
    "usedResources" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "images" JSONB,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);
