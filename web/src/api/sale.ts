import type { CriarVendaRequest } from "../interfaces/sale.interface";
import { Api } from "./api";

export async function getAllSales() {
  const result = await Api.get("/sale");
  return result;
}

export async function getSaleById(id: string) {
  const result = await Api.get(`/sale/${id}`);
  return result;
}

export async function createSale(data: CriarVendaRequest) {
  const result = await Api.post("/sale", data);
  return result;
}
