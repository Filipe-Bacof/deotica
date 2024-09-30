import type {
  AtualizarStatusOS,
  EditarOS,
  ServiceOrderResponse,
} from "../interfaces/serviceOrder.interface";
import { Api } from "./api";

export async function getAllServiceOrders(): Promise<ServiceOrderResponse[]> {
  const result = await Api.get("/serviceOrder");
  return result.data;
}

export async function getServiceOrderById(
  id: number,
): Promise<ServiceOrderResponse> {
  const result = await Api.get(`/serviceOrder/${id}`);
  return result.data;
}

export async function updateServiceOrderStatus(
  id: number,
  data: AtualizarStatusOS,
): Promise<ServiceOrderResponse> {
  const result = await Api.patch(`/serviceOrder/${id}`, data);
  return result.data;
}

export async function updateServiceOrderData(
  id: number,
  data: EditarOS,
): Promise<ServiceOrderResponse> {
  const result = await Api.put(`/serviceOrder/${id}`, data);
  return result.data;
}
