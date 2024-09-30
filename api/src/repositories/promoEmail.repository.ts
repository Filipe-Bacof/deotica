import type { CriarEmailPromocional } from "../interfaces/promoEmail.interface";
import { prisma } from "../config/database";

async function insert(data: CriarEmailPromocional) {
  console.log(data);
  return prisma.emailsPromocionais.create({
    data: data,
  });
}

async function getAll() {
  return prisma.emailsPromocionais.findMany({ orderBy: { createdAt: "desc" } });
}

async function getAllActive() {
  return prisma.emailsPromocionais.findMany({
    where: { ativo: { equals: true } },
    orderBy: { createdAt: "desc" },
  });
}

async function getAllInactive() {
  return prisma.emailsPromocionais.findMany({
    where: { ativo: { equals: false } },
    orderBy: { createdAt: "desc" },
  });
}

async function getOneById(id: string) {
  const result = await prisma.emailsPromocionais.findUnique({
    where: { id },
  });

  return result;
}

async function getOneByEmail(email: string) {
  const result = await prisma.emailsPromocionais.findUnique({
    where: { email },
  });

  return result;
}

async function updateStatus(id: string, status: boolean) {
  const result = await prisma.emailsPromocionais.update({
    where: { id },
    data: { ativo: status },
  });

  return result;
}

const profileRepository = {
  insert,
  getAll,
  getAllActive,
  getAllInactive,
  getOneById,
  getOneByEmail,
  updateStatus,
};

export default profileRepository;
