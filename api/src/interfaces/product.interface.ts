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

export type InserirProduto = Omit<Produto, "id"> &
  Partial<Pick<Produto, "status" | "quantidade">>;

export type CriarProduto = Omit<InserirProduto, "createdBy">;

export type EditarProduto = Partial<Omit<Produto, "id" | "createdBy">>;

export type VendaProduto = Pick<Produto, "id" | "preco" | "quantidade">;
