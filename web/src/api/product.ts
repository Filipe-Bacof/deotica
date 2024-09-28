import type {
  AtualizarQuantidadeProduto,
  CriarProduto,
  EditarProduto,
} from "../interfaces/product.interface";
import { Api } from "./api";

export async function registerProduct(data: CriarProduto) {
  const result = await Api.post("/product", data);
  return result;
}

export async function editProduct(id: string, data: EditarProduto) {
  const result = await Api.put(`/product/${id}`, data);
  return result;
}

export async function removeProductQuantity(
  id: string,
  data: AtualizarQuantidadeProduto,
) {
  const result = await Api.patch(`/product/minus/${id}`, data);
  return result;
}

export async function addProductQuantity(
  id: string,
  data: AtualizarQuantidadeProduto,
) {
  const result = await Api.patch(`/product/plus/${id}`, data);
  return result;
}

export async function updateProductQuantity(
  id: string,
  data: AtualizarQuantidadeProduto,
) {
  const result = await Api.patch(`/product/count/${id}`, data);
  return result;
}

export async function deleteProduct(id: string) {
  const result = await Api.delete(`/product/${id}`);
  return result;
}

export async function getAllProducts() {
  const result = await Api.get("/product");
  return result;
}

export async function getProductById(id: string) {
  const result = await Api.get(`/product/${id}`);
  return result;
}
