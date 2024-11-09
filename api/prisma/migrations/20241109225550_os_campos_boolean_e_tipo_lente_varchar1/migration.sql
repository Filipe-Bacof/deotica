/*
  Warnings:

  - You are about to alter the column `tipoLente` on the `ordemServico` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1)`.
  - The `somenteLente` column on the `ordemServico` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tipoArmacaoAC` column on the `ordemServico` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tipoArmacaoME` column on the `ordemServico` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tipoArmacaoNY` column on the `ordemServico` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tipoArmacaoPA` column on the `ordemServico` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `vaiTrazerArmacao` column on the `ordemServico` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ordemServico" ALTER COLUMN "tipoLente" SET DATA TYPE VARCHAR(1),
DROP COLUMN "somenteLente",
ADD COLUMN     "somenteLente" BOOLEAN DEFAULT false,
DROP COLUMN "tipoArmacaoAC",
ADD COLUMN     "tipoArmacaoAC" BOOLEAN DEFAULT false,
DROP COLUMN "tipoArmacaoME",
ADD COLUMN     "tipoArmacaoME" BOOLEAN DEFAULT false,
DROP COLUMN "tipoArmacaoNY",
ADD COLUMN     "tipoArmacaoNY" BOOLEAN DEFAULT false,
DROP COLUMN "tipoArmacaoPA",
ADD COLUMN     "tipoArmacaoPA" BOOLEAN DEFAULT false,
DROP COLUMN "vaiTrazerArmacao",
ADD COLUMN     "vaiTrazerArmacao" BOOLEAN DEFAULT false;
