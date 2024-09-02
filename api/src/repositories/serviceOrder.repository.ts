import { prisma } from "../config/database";
import { InserirOS } from "../interfaces/serviceOrder.interface";

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

const serviceOrderRepository = {
  insert,
  getAll,
  getById,
};

export default serviceOrderRepository;
