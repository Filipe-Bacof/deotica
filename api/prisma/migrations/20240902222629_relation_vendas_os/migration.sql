/*
  Warnings:

  - You are about to drop the column `numeroDoPedido` on the `ordemServico` table. All the data in the column will be lost.
  - You are about to drop the column `numeroDoPedido` on the `vendas` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[vendaId]` on the table `ordemServico` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `vendaId` to the `ordemServico` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ordemServico" DROP CONSTRAINT "ordemServico_numeroDoPedido_fkey";

-- DropIndex
DROP INDEX "ordemServico_numeroDoPedido_key";

-- DropIndex
DROP INDEX "vendas_numeroDoPedido_key";

-- AlterTable
ALTER TABLE "ordemServico" DROP COLUMN "numeroDoPedido",
ADD COLUMN     "vendaId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "vendas" DROP COLUMN "numeroDoPedido";

-- CreateIndex
CREATE UNIQUE INDEX "ordemServico_vendaId_key" ON "ordemServico"("vendaId");

-- AddForeignKey
ALTER TABLE "ordemServico" ADD CONSTRAINT "ordemServico_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "vendas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
