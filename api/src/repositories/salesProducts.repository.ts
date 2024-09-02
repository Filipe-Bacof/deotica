import { prisma } from "../config/database";
import { CriarVendaProduto } from "../interfaces/salesProducts.interface";

async function insert(data: CriarVendaProduto) {
  return prisma.vendasProdutos.create({
    data: data,
  });
}

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
  insert,
  countAllByProductId,
  countAllBySaleId,
};

export default salesProductsRepository;
