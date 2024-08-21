/*
  Warnings:

  - Made the column `genero` on table `clientes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "clientes" ALTER COLUMN "genero" SET NOT NULL,
ALTER COLUMN "genero" SET DEFAULT 'nao-informado';
