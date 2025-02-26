/*
  Warnings:

  - A unique constraint covering the columns `[google_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kakao_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "google_id" TEXT;
ALTER TABLE "User" ADD COLUMN "kakao_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_google_id_key" ON "User"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_kakao_id_key" ON "User"("kakao_id");
