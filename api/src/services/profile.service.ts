import type {
  CriarPerfil,
  EditarPerfil,
} from "../interfaces/profile.interface";
import profileRepository from "../repositories/profile.repository";
import { isPermission } from "../utils/permissions";

function validatePermissions(permissions: string[]) {
  if (permissions.some((permission) => !isPermission(permission))) {
    throw {
      status: 401,
      message: "As permissões especificadas não existem.",
    };
  }
}

async function getAll(populateUser: boolean) {
  const result = await profileRepository.getAll(populateUser);
  return result;
}

async function insert(data: CriarPerfil) {
  validatePermissions(data.permissoes);

  const result = await profileRepository.insert(data);
  return result;
}

async function edit(id: number, data: EditarPerfil) {
  if (!data.nome && !data.permissoes) {
    throw {
      status: 401,
      message: "Informe pelo menos um dos itens para ser atualizado.",
    };
  }

  data.permissoes && validatePermissions(data.permissoes);

  if (!id) {
    throw {
      status: 401,
      message: "É preciso informar o ID para atualizar.",
    };
  }

  const result = await profileRepository.edit(id, data);
  return result;
}

const profileService = { getAll, insert, edit };

export default profileService;
