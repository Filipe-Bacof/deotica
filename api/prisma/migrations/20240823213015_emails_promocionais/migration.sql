-- CreateTable
CREATE TABLE "emailsPromocionais" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "emailsPromocionais_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "emailsPromocionais_email_key" ON "emailsPromocionais"("email");
