import type {
  AtualizarQuantidadeEstoque,
  AtualizarQuantidadeProduto,
  CreatedProductResponse,
  CriarProduto,
  EditarProduto,
  ProductResponse,
  ProductsLowStockResponse,
  UpdatedProductResponse,
} from "../interfaces/product.interface";
import { Api } from "./api";

export async function registerProduct(
  data: CriarProduto,
): Promise<CreatedProductResponse> {
  const result = await Api.post("/product", data);
  return result.data;
}

export async function editProduct(
  id: string,
  data: EditarProduto,
): Promise<UpdatedProductResponse> {
  const result = await Api.put(`/product/${id}`, data);
  return result.data;
}

export async function removeProductQuantity(
  id: string,
  data: AtualizarQuantidadeProduto,
): Promise<ProductResponse> {
  const result = await Api.patch(`/product/minus/${id}`, data);
  return result.data;
}

export async function addProductQuantity(
  id: string,
  data: AtualizarQuantidadeProduto,
): Promise<ProductResponse> {
  const result = await Api.patch(`/product/plus/${id}`, data);
  return result.data;
}

export async function updateProductQuantity(
  id: string,
  data: AtualizarQuantidadeProduto,
): Promise<ProductResponse> {
  const result = await Api.patch(`/product/count/${id}`, data);
  return result.data;
}

export async function updateManyProductsQuantityStock(
  data: AtualizarQuantidadeEstoque,
) {
  const result = await Api.patch("/products/stock/updatemany", data);
  return result;
}

export async function deleteProduct(id: string) {
  const result = await Api.delete(`/product/${id}`);
  return result;
}

export async function getAllProducts(): Promise<ProductResponse[]> {
  const result = await Api.get("/product");
  return result.data;
}

export async function getProductsWithLowStock(): Promise<ProductsLowStockResponse> {
  const result = await Api.get("/products/lowStock");
  return result.data;
}

export async function getProductById(id: string): Promise<ProductResponse> {
  const result = await Api.get(`/product/${id}`);
  return result.data;
}
