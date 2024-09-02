import { prisma } from "../config/database";

async function countAllByProductId(produtoId: string) {
  return prisma.vendasProdutos.count({
    where: { produtoId },
  });
}

async function countAllBySaleId(vendaId: string) {
  return prisma.vendasProdutos.count({
    where: { vendaId },
  });
}

const salesProductsRepository = {
  countAllByProductId,
  countAllBySaleId,
};

export default salesProductsRepository;
