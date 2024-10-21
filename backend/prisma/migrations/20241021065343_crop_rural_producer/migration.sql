-- CreateTable
CREATE TABLE "Crop" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ruralProducerId" TEXT,

    CONSTRAINT "Crop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RuralProducer" (
    "id" TEXT NOT NULL,
    "cpfCnpj" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "farmName" VARCHAR(500) NOT NULL,
    "cityId" TEXT NOT NULL,
    "totalArea" DOUBLE PRECISION NOT NULL,
    "agriculturalArea" DOUBLE PRECISION NOT NULL,
    "vegetationArea" DOUBLE PRECISION NOT NULL,
    "cropId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RuralProducer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RuralProducerCrop" (
    "id" TEXT NOT NULL,
    "ruralProducerId" TEXT NOT NULL,
    "cropId" TEXT NOT NULL,
    "totalArea" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RuralProducerCrop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Crop_slug_key" ON "Crop"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "RuralProducer_cpfCnpj_key" ON "RuralProducer"("cpfCnpj");

-- CreateIndex
CREATE UNIQUE INDEX "RuralProducerCrop_ruralProducerId_cropId_key" ON "RuralProducerCrop"("ruralProducerId", "cropId");

-- AddForeignKey
ALTER TABLE "Crop" ADD CONSTRAINT "Crop_ruralProducerId_fkey" FOREIGN KEY ("ruralProducerId") REFERENCES "RuralProducer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuralProducer" ADD CONSTRAINT "RuralProducer_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuralProducerCrop" ADD CONSTRAINT "RuralProducerCrop_ruralProducerId_fkey" FOREIGN KEY ("ruralProducerId") REFERENCES "RuralProducer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuralProducerCrop" ADD CONSTRAINT "RuralProducerCrop_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "Crop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
