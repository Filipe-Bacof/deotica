import { EditarProduto, InserirProduto } from "../interfaces/product.interface";
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
    include: { criador: true },
  });
}

async function getById(id: string) {
  const result = await prisma.produtos.findUnique({
    where: { id },
    include: { criador: true },
  });

  return result;
}

async function updateQuantity(id: string, quantidade: number) {
  const result = await prisma.produtos.update({
    where: { id },
    data: { quantidade },
    include: { criador: true },
  });

  return result;
}

async function deleteProduct(id: string) {
  const result = await prisma.produtos.delete({
    where: { id },
  });

  return result;
}

const clientRepository = {
  getAll,
  getById,
  insert,
  edit,
  updateQuantity,
  deleteProduct,
};

export default clientRepository;