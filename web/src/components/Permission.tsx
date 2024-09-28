import { type ReactNode, useEffect, useState } from "react";
import { useAuthStore } from "../stores/userStore";

interface PermissionsProps {
  children: ReactNode;
  isComponent?: boolean;
  permissions: string[];
}

export function Permission({
  children,
  isComponent = false,
  permissions,
}: PermissionsProps) {
  const [isAllowed, setIsAllowed] = useState(false);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    // Verifica se o usuário tem o role com as permissions especificadas
    if (user?.perfil) {
      const isPermissionsMatch = permissions.every((needPermission) =>
        user.perfil.permissoes.includes(needPermission),
      );
      setIsAllowed(isPermissionsMatch);
    }
  }, [user, permissions]);

  return (
    <>
      {isAllowed && children}
      {!isAllowed && isComponent && null}
    </>
  );
}
