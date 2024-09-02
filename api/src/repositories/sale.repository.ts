import { prisma } from "../config/database";

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
  getByPaymentMethod,
  countSalesByPaymentMethod,
};

export default saleRepository;
