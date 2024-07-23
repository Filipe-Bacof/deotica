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

const profileService = { getAll, insert };

export default profileService;
