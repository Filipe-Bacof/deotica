import { CriarProduto, EditarProduto } from "../interfaces/product.interface";
import productRepository from "../repositories/product.repository";
import salesProductsRepository from "../repositories/salesProducts.repository";
import { isUUID } from "../utils/validations";

async function getAll() {
  const result = await productRepository.getAll();
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

  const result = await productRepository.getById(id);
  return result;
}

async function insert(data: CriarProduto, userID: string) {
  const result = await productRepository.insert({ ...data, createdBy: userID });
  return result;
}

async function edit(id: string, data: EditarProduto) {
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

  const result = await productRepository.edit(id, data);
  return result;
}

async function removeQuantityFromStock(id: string, quantidade: number) {
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

  const product = await productRepository.getById(id);

  if (product.quantidade < quantidade) {
    throw {
      status: 409,
      message:
        "Você está tentando deletar mais itens do que a quantidade disponível em estoque",
    };
  }

  const newQuantity = product.quantidade - quantidade;

  const result = await productRepository.updateQuantity(id, newQuantity);
  return result;
}

async function addQuantityFromStock(id: string, quantidade: number) {
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

  const product = await productRepository.getById(id);

  const newQuantity = product.quantidade + quantidade;

  const result = await productRepository.updateQuantity(id, newQuantity);
  return result;
}

async function updateQuantity(id: string, quantidade: number) {
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

  const result = await productRepository.updateQuantity(id, quantidade);
  return result;
}

async function deleteProduct(id: string) {
  if (!id) {
    throw {
      status: 401,
      message: "É preciso informar o ID para deletar.",
    };
  }
  if (!isUUID(id)) {
    throw {
      status: 422,
      message: `Este ID não é válido!`,
    };
  }

  const product = await productRepository.getById(id);
  if (!product) {
    throw {
      status: 404,
      message: "Esse produto não foi encontrado",
    };
  }

  const sales = await salesProductsRepository.countAllByProductId(id);

  if (sales !== 0) {
    throw {
      status: 409,
      message:
        sales === 1
          ? `Não é possível deletar esse produto, pois foi efetuada 1 venda com ele.`
          : `Não é possível deletar esse produto, pois foram efetuadas ${sales} vendas com ele.`,
    };
  }

  const result = await productRepository.deleteProduct(id);
  return result;
}

const productService = {
  getAll,
  getById,
  insert,
  edit,
  removeQuantityFromStock,
  addQuantityFromStock,
  updateQuantity,
  deleteProduct,
};

export default productService;
