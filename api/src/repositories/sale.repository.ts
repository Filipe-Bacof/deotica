import { prisma } from "../config/database";
import { InserirVenda } from "../interfaces/sale.interface";

async function insert(data: InserirVenda) {
  console.log(data);
  return prisma.vendas.create({
    data: data,
  });
}

async function getAll() {
  return prisma.vendas.findMany({
    include: { criador: true },
  });
}

async function getById(id: string) {
  const result = await prisma.vendas.findUnique({
    where: { id },
    include: { criador: true },
  });

  return result;
}

async function getByPaymentMethod(formaDePagamentoId: number) {
  return prisma.vendas.findMany({
    where: { formaDePagamentoId },
  });
}

async function countSalesByPaymentMethod(formaDePagamentoId: number) {
  return prisma.vendas.count({
    where: { formaDePagamentoId },
  });
}

const saleRepository = {
  insert,
  getAll,
  getById,
  getByPaymentMethod,
  countSalesByPaymentMethod,
};

export default saleRepository;
