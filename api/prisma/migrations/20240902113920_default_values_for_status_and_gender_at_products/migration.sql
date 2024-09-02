/*
  Warnings:

  - Made the column `genero` on table `produtos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "produtos" ALTER COLUMN "status" SET DEFAULT true,
ALTER COLUMN "genero" SET NOT NULL,
ALTER COLUMN "genero" SET DEFAULT 'nao-informado';
