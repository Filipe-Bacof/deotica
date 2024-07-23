import { Permission } from "../enum/Permissions";

function isPermission(permission: string): permission is Permission {
  return Object.values(Permission).includes(permission as Permission);
}

export { isPermission };
