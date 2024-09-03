import { EditarCliente, CriarCliente } from "../interfaces/client.interface";
import clientRepository from "../repositories/client.repository";
import { isUserAuthorizedToDoThisAction } from "../utils/permissions";

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

async function insert(data: CriarCliente, userID: string) {
  const isClientAlreadyRegistered = await clientRepository.getByCpf(data.cpf);

  if (isClientAlreadyRegistered) {
    throw {
      status: 409,
      message: "Já existe um cliente cadastrado com este CPF",
    };
  }

  if (!isUserAuthorizedToDoThisAction("CADASTRO_CLIENTE", userID)) {
    throw {
      status: 403,
      message: "Você não tem autorização para cadastrar clientes",
    };
  }

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
