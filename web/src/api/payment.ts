import type {
  CriarFormaDePagamento,
  EditarFormaDePagamento,
} from "../interfaces/payment.interface";
import { Api } from "./api";

export async function registerPaymentMethod(data: CriarFormaDePagamento) {
  const result = await Api.post("/payment", data);
  return result;
}

export async function editPaymentMethod(
  id: string,
  data: EditarFormaDePagamento,
) {
  const result = await Api.put(`/payment/${id}`, data);
  return result;
}

export async function deletePaymentMethod(id: string) {
  const result = await Api.delete(`/payment/${id}`);
  return result;
}

export async function getAllPaymentMethods() {
  const result = await Api.get("/payment");
  return result;
}
