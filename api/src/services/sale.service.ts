import type { CriarVendaRequest } from "../interfaces/sale.interface";
import saleRepository from "../repositories/sale.repository";
import { isUUID } from "../utils/validations";
import salesProductsService from "./salesProducts.service";
import productService from "./product.service";
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
      message: "Este ID não é válido!",
    };
  }
  const result = await saleRepository.getById(id);

  if (!result) {
    throw {
      status: 404,
      message: "Essa venda não foi encontrada",
    };
  }

  return result;
}

async function insert(data: CriarVendaRequest, userID: string) {
  try {
    const venda = await saleRepository.insert({
      ...data.venda,
      createdBy: userID,
    });

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

    const atualizados = [];
    const errosAtualizar = [];

    const quantidades = await Promise.all(
      data.produtos.map((product) =>
        productService
          .removeQuantityFromStock(product.id, product.quantidade)
          .then((atualizar) => {
            atualizados.push(atualizar);
          })
          .catch((error) => {
            console.error(
              `Erro ao remover quantidade do produto com id ${product.id}`
            );
            console.error(error);
            errosAtualizar.push(error);
          })
      )
    );

    console.log("✅ Quantidades de cada produto decrementadas com sucesso!");
    console.log(quantidades);

    let ordemServico = null;

    if (data.ordemServico) {
      try {
        const ordemDeServico = await serviceOrderService.insert({
          ...data.ordemServico,
          vendaId: venda.id,
          clienteId: venda.clienteId,
          createdBy: userID,
        });
        console.log("✅ Ordem de serviço criada com sucesso!");
        console.log(ordemDeServico);
        ordemServico = ordemDeServico;
      } catch (error) {
        console.log(error);
        ordemServico = error;
      }
    }

    return {
      venda,
      produtos,
      ...(ordemServico && { ordemServico }),
      atualizarQuantidades: {
        atualizados,
        erros: errosAtualizar.length > 0 ? errosAtualizar : null,
      },
    };
  } catch (error) {
    console.error("Erro inesperado:", error);
    throw {
      status: 400,
      message: "Erro inesperado!",
    };
  }
}

const saleService = {
  getAll,
  getById,
  insert,
};

export default saleService;
