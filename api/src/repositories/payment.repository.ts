import type {
  InserirFormaDePagamento,
  EditarFormaDePagamento,
} from "../interfaces/payment.interface";
import { prisma } from "../config/database";

async function insert(data: InserirFormaDePagamento) {
  console.log(data);
  return prisma.formasDePagamento.create({
    data: data,
  });
}

async function edit(id: number, data: EditarFormaDePagamento) {
  console.log(data);
  return prisma.formasDePagamento.update({
    where: { id },
    data: {
      ...data,
    },
  });
}

async function getAll() {
  return prisma.formasDePagamento.findMany({ orderBy: { createdAt: "desc" } });
}

async function getOne(id: number) {
  return prisma.formasDePagamento.findUnique({ where: { id } });
}

async function deletePayment(id: number) {
  return prisma.formasDePagamento.delete({ where: { id } });
}

const clientRepository = {
  insert,
  edit,
  getAll,
  getOne,
  deletePayment,
};

export default clientRepository;
