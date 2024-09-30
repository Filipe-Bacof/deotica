import type {
  CriarFormaDePagamento,
  EditarFormaDePagamento,
  PaymentMethodResponse,
} from "../interfaces/payment.interface";
import { Api } from "./api";

export async function registerPaymentMethod(
  data: CriarFormaDePagamento,
): Promise<PaymentMethodResponse> {
  const result = await Api.post("/payment", data);
  return result.data;
}

export async function editPaymentMethod(
  id: number,
  data: EditarFormaDePagamento,
): Promise<PaymentMethodResponse> {
  const result = await Api.put(`/payment/${id}`, data);
  return result.data;
}

export async function deletePaymentMethod(
  id: number,
): Promise<PaymentMethodResponse> {
  const result = await Api.delete(`/payment/${id}`);
  return result.data;
}

export async function getAllPaymentMethods(): Promise<PaymentMethodResponse[]> {
  const result = await Api.get("/payment");
  return result.data;
}

export async function getOnePaymentMethod(
  id: number,
): Promise<PaymentMethodResponse> {
  const result = await Api.get(`/payment/${id}`);
  return result.data;
}
