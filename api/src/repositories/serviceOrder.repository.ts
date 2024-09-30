import { prisma } from "../config/database";
import type {
  AtualizarStatusOS,
  EditarOS,
  InserirOS,
} from "../interfaces/serviceOrder.interface";

async function insert(data: InserirOS) {
  console.log(data);
  return prisma.ordemServico.create({
    data: data,
  });
}

async function getAll() {
  return prisma.ordemServico.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      criador: {
        select: {
          id: true,
          nome: true,
          email: true,
        },
      },
    },
  });
}

async function getById(id: number) {
  const result = await prisma.ordemServico.findUnique({
    where: { id },
    include: {
      criador: {
        select: {
          id: true,
          nome: true,
          email: true,
        },
      },
    },
  });

  return result;
}

async function getBySaleId(vendaId: string) {
  const result = await prisma.ordemServico.findUnique({
    where: { vendaId },
    include: {
      criador: {
        select: {
          id: true,
          nome: true,
          email: true,
        },
      },
    },
  });

  return result;
}

async function updateStatus(id: number, data: AtualizarStatusOS) {
  const result = await prisma.ordemServico.update({
    where: { id },
    data,
    include: {
      criador: {
        select: {
          id: true,
          nome: true,
          email: true,
        },
      },
    },
  });

  return result;
}

async function updateDataOS(id: number, data: EditarOS) {
  const result = await prisma.ordemServico.update({
    where: { id },
    data,
    include: {
      criador: {
        select: {
          id: true,
          nome: true,
          email: true,
        },
      },
    },
  });

  return result;
}

const serviceOrderRepository = {
  insert,
  getAll,
  getById,
  getBySaleId,
  updateStatus,
  updateDataOS,
};

export default serviceOrderRepository;
