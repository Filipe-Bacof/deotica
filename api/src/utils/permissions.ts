import { Permission } from "../enum/Permissions";
import authRepository from "../repositories/auth.repository";

function isPermission(permission: string): permission is Permission {
  return Object.values(Permission).includes(permission as Permission);
}

async function isUserAuthorizedToDoThisAction(
  permission: string,
  userId: string
): Promise<boolean> {
  const user = await authRepository.getOneUser(userId);

  if (user.perfilUsuario.permissoes.includes("ADMIN")) {
    return true;
  }

  return user.perfilUsuario.permissoes.includes(permission);
}

export { isPermission, isUserAuthorizedToDoThisAction };
