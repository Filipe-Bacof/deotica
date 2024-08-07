import { Perfil } from "../interfaces/profile.interface";
import profileRepository from "../repositories/profile.repository";
import { isPermission } from "../utils/profiles";

async function getAll(populateUser: boolean) {
  const result = await profileRepository.getAll(populateUser);
  return result;
}

async function insert(data: Perfil) {
  if (data.permissoes.some((permission) => !isPermission(permission))) {
    throw {
      status: 401,
      message: "As permissões especificadas não existem.",
    };
  }

  const result = await profileRepository.insert(data);
  return result;
}
async function edit(data: Perfil) {
  if (data.permissoes.some((permission) => !isPermission(permission))) {
    throw {
      status: 401,
      message: "As permissões especificadas não existem.",
    };
  }

  if (!data.id) {
    throw {
      status: 401,
      message: "É preciso informar o ID para atualizar.",
    };
  }

  const result = await profileRepository.edit(data);
  return result;
}

const profileService = { getAll, insert, edit };

export default profileService;
