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

type ProdutoAtualizarEstoque = Pick<Produto, "id" | "quantidade">;

export type AtualizarQuantidadeEstoque = {
  produtos: ProdutoAtualizarEstoque[];
};

export type InserirProduto = Omit<Produto, "id" | "status" | "quantidade"> &
  Partial<Pick<Produto, "status" | "quantidade">>;

export type CriarProduto = Omit<InserirProduto, "createdBy">;

export type EditarProduto = Partial<CriarProduto>;

export type VendaProduto = Pick<Produto, "id" | "preco" | "quantidade">;
