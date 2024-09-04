import { prisma } from "../config/database";
import {
  AtualizarStatusOS,
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
    include: { criador: true },
  });
}

async function getById(id: number) {
  const result = await prisma.ordemServico.findUnique({
    where: { id },
    include: { criador: true },
  });

  return result;
}

async function updateStatus(id: number, data: AtualizarStatusOS) {
  const result = await prisma.ordemServico.update({
    where: { id },
    data,
    include: { criador: true },
  });

  return result;
}

const serviceOrderRepository = {
  insert,
  getAll,
  getById,
  updateStatus,
};

export default serviceOrderRepository;
