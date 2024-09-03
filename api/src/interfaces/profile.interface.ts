export interface Perfil {
  id: number;
  nome: string;
  permissoes: string[];
}

export type CriarPerfil = Omit<Perfil, "id">;

export type EditarPerfil = CriarPerfil;
