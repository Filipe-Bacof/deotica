import {
  InserirFormaDePagamento,
  EditarFormaDePagamento,
} from "../interfaces/payment.interface";
import paymentRepository from "../repositories/payment.repository";

async function getAll() {
  const result = await paymentRepository.getAll();
  return result;
}

async function insert(data: InserirFormaDePagamento) {
  const result = await paymentRepository.insert(data);
  return result;
}

async function edit(id: number, data: EditarFormaDePagamento) {
  if (!id) {
    throw {
      status: 401,
      message: "É preciso informar o ID para atualizar.",
    };
  }

  const result = await paymentRepository.edit(id, data);
  return result;
}

async function deletePayment(id: number) {
  if (!id) {
    throw {
      status: 401,
      message: "É preciso informar o ID para atualizar.",
    };
  }

  // Adicionar validação quando criar o módulo de vendas
  // Ao tentar deletar uma forma de pagamento
  // Caso tenha pelo menos uma venda feita por essa forma de pagamento
  // Impedir o deletamento e retornar mensagem de erro

  const result = await paymentRepository.deletePayment(id);
  return result;
}

const paymentService = { getAll, insert, edit, deletePayment };

export default paymentService;
