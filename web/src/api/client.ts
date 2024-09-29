import type {
  ClientsResponse,
  CreatedClientResponse,
  CriarCliente,
  EditarCliente,
} from "../interfaces/client.interface";
import { Api } from "./api";

export async function registerClient(
  data: CriarCliente,
): Promise<CreatedClientResponse> {
  const result = await Api.post("/client", data);
  return result.data;
}

export async function editClient(id: string, data: EditarCliente) {
  const result = await Api.put(`/client/${id}`, data);
  return result;
}

export async function getAllClients(): Promise<ClientsResponse[]> {
  const result = await Api.get("/client");
  console.log(result);
  return result.data;
}

export async function getClientByCpf(cpf: string) {
  const result = await Api.get(`/client/cpf/${cpf}`);
  return result;
}

export async function getClientById(id: string): Promise<ClientsResponse> {
  const result = await Api.get(`/client/id/${id}`);
  console.log(result);
  return result.data;
}
