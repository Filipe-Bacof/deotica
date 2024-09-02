import {
  InserirFormaDePagamento,
  EditarFormaDePagamento,
} from "../interfaces/payment.interface";
import paymentRepository from "../repositories/payment.repository";
import saleRepository from "../repositories/sale.repository";

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

  const sales = await saleRepository.countSalesByPaymentMethod(id);

  if (sales !== 0) {
    throw {
      status: 409,
      message:
        sales === 1
          ? `Não é possível deletar essa forma de pagamento, pois foi efetuada 1 venda nessa forma de pagamento.`
          : `Não é possível deletar essa forma de pagamento, pois foram efetuadas ${sales} vendas nessa forma de pagamento.`,
    };
  }

  const result = await paymentRepository.deletePayment(id);
  return result;
}

const paymentService = { getAll, insert, edit, deletePayment };

export default paymentService;
