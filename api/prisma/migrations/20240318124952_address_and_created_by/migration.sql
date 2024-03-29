/*
  Warnings:

  - Added the required column `createdBy` to the `clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `formasDePagamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `produtos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `vendas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `vendasProdutos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clientes" ADD COLUMN     "bairro" TEXT,
ADD COLUMN     "cep" TEXT,
ADD COLUMN     "cidade" TEXT,
ADD COLUMN     "complemento" TEXT,
ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "endereco" TEXT,
ADD COLUMN     "uf" TEXT;

-- AlterTable
ALTER TABLE "formasDePagamento" ADD COLUMN     "createdBy" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "produtos" ADD COLUMN     "createdBy" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "vendas" ADD COLUMN     "createdBy" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "vendasProdutos" ADD COLUMN     "createdBy" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "formasDePagamento" ADD CONSTRAINT "formasDePagamento_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendas" ADD CONSTRAINT "vendas_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendasProdutos" ADD CONSTRAINT "vendasProdutos_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
