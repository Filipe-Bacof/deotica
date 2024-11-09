/*
  Warnings:

  - You are about to drop the column `armacao` on the `ordemServico` table. All the data in the column will be lost.
  - You are about to drop the column `olhoDireito` on the `ordemServico` table. All the data in the column will be lost.
  - You are about to drop the column `olhoEsquerdo` on the `ordemServico` table. All the data in the column will be lost.
  - You are about to drop the column `tipoArmacao` on the `ordemServico` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ordemServico" DROP COLUMN "armacao",
DROP COLUMN "olhoDireito",
DROP COLUMN "olhoEsquerdo",
DROP COLUMN "tipoArmacao",
ADD COLUMN     "adicao" TEXT,
ADD COLUMN     "armacaoHoriz" TEXT,
ADD COLUMN     "armacaoMD" TEXT,
ADD COLUMN     "armacaoPonte" TEXT,
ADD COLUMN     "armacaoTA" TEXT,
ADD COLUMN     "armacaoVert" TEXT,
ADD COLUMN     "olhoDireitoAltura" TEXT,
ADD COLUMN     "olhoDireitoCil" TEXT,
ADD COLUMN     "olhoDireitoDNP" TEXT,
ADD COLUMN     "olhoDireitoEixo" TEXT,
ADD COLUMN     "olhoDireitoEsf" TEXT,
ADD COLUMN     "olhoEsquerdoAltura" TEXT,
ADD COLUMN     "olhoEsquerdoCil" TEXT,
ADD COLUMN     "olhoEsquerdoDNP" TEXT,
ADD COLUMN     "olhoEsquerdoEixo" TEXT,
ADD COLUMN     "olhoEsquerdoEsf" TEXT,
ADD COLUMN     "tipoArmacaoAC" TEXT DEFAULT '0',
ADD COLUMN     "tipoArmacaoME" TEXT DEFAULT '0',
ADD COLUMN     "tipoArmacaoNY" TEXT DEFAULT '0',
ADD COLUMN     "tipoArmacaoPA" TEXT DEFAULT '0',
ADD COLUMN     "vaiTrazerArmacao" TEXT DEFAULT '0',
ALTER COLUMN "somenteLente" DROP NOT NULL,
ALTER COLUMN "somenteLente" SET DEFAULT '0',
ALTER COLUMN "somenteLente" SET DATA TYPE TEXT;
