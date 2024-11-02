import type {
  CriarVendaRequest,
  CreateSaleResponse,
  SaleResponse,
} from "../interfaces/sale.interface";
import { Api } from "./api";

export async function getAllSales(): Promise<SaleResponse[]> {
  const result = await Api.get("/sale");
  return result.data;
}

export async function getSaleById(id: string): Promise<SaleResponse> {
  const result = await Api.get(`/sale/${id}`);
  return result.data;
}

export async function createSale(
  data: CriarVendaRequest,
): Promise<CreateSaleResponse> {
  const result = await Api.post("/sale", data);
  console.log(result);
  return result.data;
}
