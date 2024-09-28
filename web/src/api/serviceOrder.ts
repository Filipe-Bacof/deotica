import type {
  AtualizarStatusOS,
  EditarOS,
} from "../interfaces/serviceOrder.interface";
import { Api } from "./api";

export async function getAllServiceOrders() {
  const result = await Api.get("/serviceOrder");
  return result;
}

export async function getServiceOrderById(id: number) {
  const result = await Api.get(`/serviceOrder/${id}`);
  return result;
}

export async function updateServiceOrderStatus(
  id: number,
  data: AtualizarStatusOS,
) {
  const result = await Api.patch(`/serviceOrder/${id}`, data);
  return result;
}

export async function updateServiceOrderData(id: number, data: EditarOS) {
  const result = await Api.put(`/serviceOrder/${id}`, data);
  return result;
}
