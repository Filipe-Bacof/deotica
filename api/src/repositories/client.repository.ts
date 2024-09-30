import type {
  EditarCliente,
  InserirCliente,
} from "../interfaces/client.interface";
import { prisma } from "../config/database";

async function insert(data: InserirCliente) {
  console.log(data);
  return prisma.clientes.create({
    data: data,
  });
}

async function edit(id: string, data: EditarCliente) {
  console.log(data);
  return prisma.clientes.update({
    where: { id },
    data: {
      ...data,
    },
  });
}

async function getAll() {
  const clientes = await prisma.clientes.findMany({
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

  return clientes;
}

async function getByCpf(cpf: string) {
  const result = await prisma.clientes.findUnique({
    where: { cpf },
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

async function getById(id: string) {
  const result = await prisma.clientes.findUnique({
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

async function getOneByEmail(email: string) {
  const result = await prisma.clientes.findFirst({
    where: { email },
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

const clientRepository = {
  insert,
  edit,
  getAll,
  getByCpf,
  getById,
  getOneByEmail,
};

export default clientRepository;
