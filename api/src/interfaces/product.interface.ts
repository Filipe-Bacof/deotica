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

export type CriarProduto = Omit<Produto, "id" | "createdBy"> & {
  status?: boolean;
  quantidade?: number;
};

export type InserirProduto = Omit<Produto, "id"> & {
  status?: boolean;
  quantidade?: number;
};

export type EditarProduto = Partial<Omit<Produto, "id" | "createdBy">>;

export interface VendaProduto {
  id: string;
  preco: number;
  quantidade: number;
}
