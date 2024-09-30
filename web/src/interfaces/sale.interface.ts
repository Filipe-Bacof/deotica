import type { ProductResponse, VendaProduto } from "./product.interface";
import type { CriarOS, ServiceOrderResponse } from "./serviceOrder.interface";

export interface Venda {
  id: string;
  formaDePagamentoId: number;
  clienteId: string;
  numeroDeParcelas?: number;
  valorDeEntrada: number;
  desconto: number;
  createdBy: string;
}

export type InserirVenda = Omit<Venda, "id">;

export type CriarVenda = Omit<InserirVenda, "createdBy">;

export type CriarVendaRequest = {
  venda: CriarVenda;
  produtos: VendaProduto[];
  ordemServico?: CriarOS;
};

type Dates = {
  createdAt: string;
  updatedAt: string;
};

export interface SaleResponse {
  venda: Venda & Dates;
  produtos: [
    {
      vendaId: string;
      produtoId: string;
      quantidade: number;
      preco: string;
    } & Dates,
  ];
  ordemServico: ServiceOrderResponse;
  atualizarQuantidades: {
    atualizados: ProductResponse[];
    erros: string | null;
  };
}
