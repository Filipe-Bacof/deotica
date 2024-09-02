import { CriarVendaProduto } from "../interfaces/salesProducts.interface";
import salesProductsRepository from "../repositories/salesProducts.repository";

async function insert(data: CriarVendaProduto) {
  const result = await salesProductsRepository.insert(data);
  return result;
}

const salesProductsService = {
  insert,
};

export default salesProductsService;
