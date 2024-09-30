import { prisma } from "../config/database";
import type { InserirVenda } from "../interfaces/sale.interface";

async function insert(data: InserirVenda) {
  console.log(data);
  return prisma.vendas.create({
    data: data,
  });
}

async function getAll() {
  return prisma.vendas.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      criador: {
        select: {
          id: true,
          nome: true,
          email: true,
        },
      },
      ordemServico: {
        include: {
          criador: {
            select: {
              id: true,
              nome: true,
              email: true,
            },
          },
        },
      },
      formaDePagamento: {
        select: {
          id: true,
          descricao: true,
        },
      },
      cliente: {
        select: {
          id: true,
          nome: true,
          genero: true,
        },
      },
      vendasProdutos: {
        include: {
          produto: {
            select: {
              id: true,
              nome: true,
              quantidade: true,
              preco: true,
              status: true,
              genero: true,
            },
          },
        },
      },
    },
  });
}

async function getById(id: string) {
  const result = await prisma.vendas.findUnique({
    where: { id },
    include: {
      criador: {
        select: {
          id: true,
          nome: true,
          email: true,
        },
      },
      ordemServico: {
        include: {
          criador: {
            select: {
              id: true,
              nome: true,
              email: true,
            },
          },
        },
      },
      formaDePagamento: {
        select: {
          id: true,
          descricao: true,
        },
      },
      cliente: {
        select: {
          id: true,
          nome: true,
          genero: true,
        },
      },
      vendasProdutos: {
        include: {
          produto: {
            select: {
              id: true,
              nome: true,
              quantidade: true,
              preco: true,
              status: true,
              genero: true,
            },
          },
        },
      },
    },
  });

  return result;
}

async function getByPaymentMethod(formaDePagamentoId: number) {
  return prisma.vendas.findMany({
    where: { formaDePagamentoId },
    orderBy: { createdAt: "desc" },
    include: {
      criador: {
        select: {
          id: true,
          nome: true,
          email: true,
        },
      },
      ordemServico: {
        include: {
          criador: {
            select: {
              id: true,
              nome: true,
              email: true,
            },
          },
        },
      },
      formaDePagamento: {
        select: {
          id: true,
          descricao: true,
        },
      },
      cliente: {
        select: {
          id: true,
          nome: true,
          genero: true,
        },
      },
      vendasProdutos: {
        include: {
          produto: {
            select: {
              id: true,
              nome: true,
              quantidade: true,
              preco: true,
              status: true,
              genero: true,
            },
          },
        },
      },
    },
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
