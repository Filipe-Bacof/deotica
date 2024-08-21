import { EditarCliente, NovoCliente } from "../interfaces/client.interface";
import clientRepository from "../repositories/client.repository";

async function getAll() {
  const result = await clientRepository.getAll();
  return result;
}

async function getByCpf(cpf: string) {
  const result = await clientRepository.getByCpf(cpf);
  return result;
}

async function getById(id: string) {
  const result = await clientRepository.getById(id);
  return result;
}

async function insert(data: NovoCliente, userID: string) {
  const result = await clientRepository.insert({ ...data, createdBy: userID });
  return result;
}

async function edit(id: string, data: EditarCliente) {
  if (!id) {
    throw {
      status: 401,
      message: "É preciso informar o ID para atualizar.",
    };
  }

  const result = await clientRepository.edit(id, data);
  return result;
}

const clientService = { getAll, getByCpf, getById, insert, edit };

export default clientService;
