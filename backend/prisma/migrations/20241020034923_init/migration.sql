-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "namePt" VARCHAR(100) NOT NULL,
    "acronym" VARCHAR(2),
    "bacenCode" INTEGER NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StateProvince" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "acronym" VARCHAR(2) NOT NULL,
    "ibge" VARCHAR(100) NOT NULL,
    "countryId" TEXT NOT NULL,
    "ddd" VARCHAR(255) NOT NULL,

    CONSTRAINT "StateProvince_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "stateId" TEXT NOT NULL,
    "ibge" VARCHAR(10) NOT NULL,
    "latLong" VARCHAR(255) NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "tomCode" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StateProvince" ADD CONSTRAINT "StateProvince_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "StateProvince"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
