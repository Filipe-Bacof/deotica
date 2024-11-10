import type {
  EditarProduto,
  InserirProduto,
} from "../interfaces/product.interface";
import { prisma } from "../config/database";

async function insert(data: InserirProduto) {
  console.log(data);
  return prisma.produtos.create({
    data: data,
  });
}

async function edit(id: string, data: EditarProduto) {
  console.log(data);
  return prisma.produtos.update({
    where: { id },
    data: {
      ...data,
    },
  });
}

async function getAll() {
  return prisma.produtos.findMany({
    orderBy: { createdAt: "desc" },
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

async function getAllLowData() {
  return prisma.produtos.findMany({
    orderBy: { quantidade: "asc" },
    select: { id: true, nome: true, quantidade: true },
  });
}

async function getProductsWithLowQuantity() {
  return prisma.produtos.findMany({
    where: { AND: { status: { equals: true }, quantidade: { lt: 30 } } },
    orderBy: { quantidade: "asc" },
    select: { id: true, nome: true, quantidade: true },
    take: 5,
  });
}

async function getTotalProductsCount() {
  return prisma.produtos.count();
}

async function getTotalProductsLowStockCount() {
  return prisma.produtos.count({
    where: { quantidade: { lt: 30 } },
  });
}

async function getById(id: string) {
  const result = await prisma.produtos.findUnique({
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

async function updateQuantity(id: string, quantidade: number) {
  const result = await prisma.produtos.update({
    where: { id },
    data: { quantidade },
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

async function deleteProduct(id: string) {
  const result = await prisma.produtos.delete({
    where: { id },
  });

  return result;
}

const productRepository = {
  getAll,
  getAllLowData,
  getProductsWithLowQuantity,
  getTotalProductsCount,
  getTotalProductsLowStockCount,
  getById,
  insert,
  edit,
  updateQuantity,
  deleteProduct,
};

export default productRepository;
