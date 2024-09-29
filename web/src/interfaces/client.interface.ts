import type { Criador } from "./user.interface";

export interface Cliente {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
  email?: string;
  dataNascimento?: Date;
  genero?: "masculino" | "feminino" | "nao-informado";
  cep?: string;
  uf?: string;
  cidade?: string;
  bairro?: string;
  endereco?: string;
  complemento?: string;
  createdBy: string;
}

export type InserirCliente = Omit<Cliente, "id">;

export type CriarCliente = Omit<InserirCliente, "createdBy">;

export type EditarCliente = Partial<CriarCliente>;

export interface ClientsResponse {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  dataNascimento: string;
  genero: "masculino" | "feminino" | "nao-informado";
  cep: string;
  uf: string;
  cidade: string;
  bairro: string;
  endereco: string;
  complemento: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  criador: Criador;
}

export interface CreatedClientResponse {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
  email: string | null;
  dataNascimento: string;
  genero: "masculino" | "feminino" | "nao-informado";
  cep: string | null;
  uf: string | null;
  cidade: string | null;
  bairro: string | null;
  endereco: string | null;
  complemento: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export type UpdatedClientResponse = CreatedClientResponse;
