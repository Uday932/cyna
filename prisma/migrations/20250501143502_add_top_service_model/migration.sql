-- CreateTable
CREATE TABLE "TopService" (
    "id" SERIAL NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TopService_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TopService" ADD CONSTRAINT "TopService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
