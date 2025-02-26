/*
  Warnings:

  - You are about to drop the column `address` on the `ONG` table. All the data in the column will be lost.
  - Added the required column `addressId` to the `ONG` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ONG" DROP COLUMN "address",
ADD COLUMN     "addressId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ONG" ADD CONSTRAINT "ONG_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
