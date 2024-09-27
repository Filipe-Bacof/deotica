import type { Perfil } from "./profile.interface";

export interface User {
  id: number;
  nome: string;
  email: string;
  perfil: Perfil;
  createdAt: string;
  updatedAt: string;
}
