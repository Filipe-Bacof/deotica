import type { Criador } from "./user.interface";

export interface Produto {
  id: string;
  nome: string;
  quantidade: number;
  preco: number;
  status: boolean;
  codigoDeBarras?: string;
  marca?: string;
  modelo?: string;
  tipo?: string;
  genero: string;
  produtoAtivo?: string;
  createdBy: string;
}

export type AtualizarQuantidadeProduto = Pick<Produto, "quantidade">;

export type InserirProduto = Omit<Produto, "id" | "status" | "quantidade"> &
  Partial<Pick<Produto, "status" | "quantidade">>;

export type CriarProduto = Omit<InserirProduto, "createdBy">;

export type EditarProduto = Partial<CriarProduto>;

export type VendaProduto = Pick<Produto, "id" | "preco" | "quantidade">;

export interface ProductResponse {
  id: string;
  nome: string;
  quantidade: number;
  preco: string;
  status: boolean;
  codigoDeBarras: string | null;
  marca: string | null;
  modelo: string | null;
  tipo: string | null;
  genero: "masculino" | "feminino" | "unissex" | "nao-informado";
  produtoAtivo: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  criador: Criador;
}

export type CreatedProductResponse = Omit<ProductResponse, "criador">;

export type UpdatedProductResponse = CreatedProductResponse;

export interface VendaProdutoResponse {
  vendaId: string;
  produtoId: string;
  quantidade: number;
  preco: string;
  createdAt: string;
  updatedAt: string;
  produto: {
    id: string;
    nome: string;
    quantidade: number;
    preco: string;
    status: boolean;
    genero: "masculino" | "feminino" | "unissex" | "nao-informado";
  };
}
