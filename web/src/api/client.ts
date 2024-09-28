import type {
  CriarCliente,
  EditarCliente,
} from "../interfaces/client.interface";
import { Api } from "./api";

export async function registerClient(data: CriarCliente) {
  const result = await Api.post("/client", data);
  return result;
}

export async function editClient(id: string, data: EditarCliente) {
  const result = await Api.put(`/client/${id}`, data);
  return result;
}

export async function getAllClients() {
  const result = await Api.get("/client");
  return result;
}

export async function getClientByCpf(cpf: string) {
  const result = await Api.get(`/client/cpf/${cpf}`);
  return result;
}

export async function getClientById(id: string) {
  const result = await Api.get(`/client/id/${id}`);
  return result;
}
