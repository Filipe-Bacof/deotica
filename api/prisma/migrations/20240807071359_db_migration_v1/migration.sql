/*
  Warnings:

  - You are about to drop the column `documento` on the `clientes` table. All the data in the column will be lost.
  - You are about to alter the column `preco` on the `produtos` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to drop the column `createdBy` on the `vendasProdutos` table. All the data in the column will be lost.
  - You are about to alter the column `preco` on the `vendasProdutos` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - A unique constraint covering the columns `[cpf]` on the table `clientes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[numeroDoPedido]` on the table `vendas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desconto` to the `vendas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numeroDoPedido` to the `vendas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorDeEntrada` to the `vendas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "vendasProdutos" DROP CONSTRAINT "vendasProdutos_createdBy_fkey";

-- AlterTable
ALTER TABLE "clientes" DROP COLUMN "documento",
ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "dataNascimento" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "produtos" ALTER COLUMN "preco" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "vendas" ADD COLUMN     "desconto" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "numeroDoPedido" INTEGER NOT NULL,
ADD COLUMN     "valorDeEntrada" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "vendasProdutos" DROP COLUMN "createdBy",
ALTER COLUMN "preco" SET DATA TYPE DECIMAL(10,2);

-- CreateTable
CREATE TABLE "ordemServico" (
    "id" SERIAL NOT NULL,
    "numeroDoPedido" INTEGER NOT NULL,
    "clienteId" TEXT NOT NULL,
    "dataDeEntrega" TIMESTAMP(3),
    "concluido" TEXT NOT NULL DEFAULT 'pendente',
    "olhoEsquerdo" TEXT,
    "olhoDireito" TEXT,
    "tipoLente" TEXT,
    "corLente" TEXT,
    "modeloLente" TEXT,
    "tratamentos" TEXT,
    "observacoes" TEXT,
    "armacao" TEXT,
    "tipoArmacao" TEXT,
    "somenteLente" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ordemServico_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ordemServico_numeroDoPedido_key" ON "ordemServico"("numeroDoPedido");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_cpf_key" ON "clientes"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "vendas_numeroDoPedido_key" ON "vendas"("numeroDoPedido");

-- AddForeignKey
ALTER TABLE "ordemServico" ADD CONSTRAINT "ordemServico_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordemServico" ADD CONSTRAINT "ordemServico_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordemServico" ADD CONSTRAINT "ordemServico_numeroDoPedido_fkey" FOREIGN KEY ("numeroDoPedido") REFERENCES "vendas"("numeroDoPedido") ON DELETE RESTRICT ON UPDATE CASCADE;
