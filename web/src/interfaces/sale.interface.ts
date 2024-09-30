import type {
  ProductResponse,
  VendaProduto,
  VendaProdutoResponse,
} from "./product.interface";
import type { CriarOS, ServiceOrderResponse } from "./serviceOrder.interface";
import type { Criador } from "./user.interface";
import type { PaymentResponse } from "./payment.interface";
import type { ClienteNomeGenero } from "./client.interface";

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

export interface CreateSaleResponse {
  venda: Venda & Dates;
  produtos: [
    {
      vendaId: string;
      produtoId: string;
      quantidade: number;
      preco: string;
    } & Dates,
  ];
  ordemServico?: ServiceOrderResponse;
  atualizarQuantidades: {
    atualizados: ProductResponse[];
    erros: string | null;
  };
}

export type SaleResponse = Venda &
  Dates &
  Criador & {
    ordemServico: (ServiceOrderResponse & Criador) | null;
    formaDePagamento: PaymentResponse;
    cliente: ClienteNomeGenero;
    vendasProdutos: VendaProdutoResponse[];
  };
