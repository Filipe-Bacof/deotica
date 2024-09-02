import { CriarVenda } from "../interfaces/sale.interface";
import saleRepository from "../repositories/sale.repository";
import salesProductsService from "./salesProducts.service";
import serviceOrderService from "./serviceOrder.service";

async function getAll() {
  const result = await saleRepository.getAll();
  return result;
}

async function getById(id: string) {
  const result = await saleRepository.getById(id);
  return result;
}

async function insert(data: CriarVenda, userID: string) {
  const venda = await saleRepository.insert({ ...data, createdBy: userID });

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
