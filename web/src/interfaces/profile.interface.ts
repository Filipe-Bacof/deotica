export interface Perfil {
  id: number;
  nome: string;
  permissoes: string[];
  createdAt: string;
  updatedAt: string;
}

export type CriarPerfil = Omit<Perfil, "id" | "createdAt" | "updatedAt">;

export type EditarPerfil = CriarPerfil;
