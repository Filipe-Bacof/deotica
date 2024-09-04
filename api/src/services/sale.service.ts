import { CriarVenda, InserirVenda } from "../interfaces/sale.interface";
import saleRepository from "../repositories/sale.repository";
import { isUUID } from "../utils/validations";
import salesProductsService from "./salesProducts.service";
import serviceOrderService from "./serviceOrder.service";

async function getAll() {
  const result = await saleRepository.getAll();
  return result;
}

async function getById(id: string) {
  if (!id) {
    throw {
      status: 401,
      message: "É preciso informar o ID para atualizar.",
    };
  }
  if (!isUUID(id)) {
    throw {
      status: 422,
      message: `Este ID não é válido!`,
    };
  }
  const result = await saleRepository.getById(id);
  return result;
}

async function insert(data: CriarVenda, userID: string) {
  const dataVenda: InserirVenda = {
    clienteId: data.clienteId,
    desconto: data.desconto,
    formaDePagamentoId: data.formaDePagamentoId,
    valorDeEntrada: data.valorDeEntrada,
    ...(data.numeroDeParcelas && { numeroDeParcelas: data.numeroDeParcelas }),
    createdBy: userID,
  };

  const venda = await saleRepository.insert(dataVenda);

  const produtos = await Promise.all(
    data.produtos.map((product) =>
      salesProductsService.insert({
        vendaId: venda.id,
        produtoId: product.id,
        preco: product.preco,
        quantidade: product.quantidade,
      })
    )
  );

  console.log("✅ Produtos de cada venda informados com sucesso!");
  console.log(produtos);

  if (data.ordemServico) {
    const ordemDeServico = await serviceOrderService.insert({
      ...data.ordemServico,
      vendaId: venda.id,
      clienteId: venda.clienteId,
      createdBy: userID,
    });
    console.log("✅ Ordem de serviço criada com sucesso!");
    console.log(ordemDeServico);
  }

  return venda;
}

const saleService = {
  getAll,
  getById,
  insert,
};

export default saleService;
