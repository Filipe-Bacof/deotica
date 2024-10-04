import type {
  ClientsResponse,
  CreatedClientResponse,
  CriarCliente,
  EditarCliente,
  UpdatedClientResponse,
} from "../interfaces/client.interface";
import { Api } from "./api";

export async function registerClient(
  data: CriarCliente,
): Promise<CreatedClientResponse> {
  const result = await Api.post("/client", data);
  return result.data;
}

export async function editClient(
  id: string,
  data: EditarCliente,
): Promise<UpdatedClientResponse> {
  const result = await Api.put(`/client/${id}`, data);
  return result.data;
}

export async function getAllClients(): Promise<ClientsResponse[]> {
  const result = await Api.get("/client");
  return result.data;
}

export async function getClientByCpf(cpf: string): Promise<ClientsResponse> {
  const result = await Api.get(`/client/cpf/${cpf}`);
  return result.data;
}

export async function getClientById(id: string): Promise<ClientsResponse> {
  const result = await Api.get(`/client/id/${id}`);
  return result.data;
}
