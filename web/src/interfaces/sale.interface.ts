import type {
  ProductResponse,
  VendaProduto,
  VendaProdutoResponse,
} from "./product.interface";
import type {
  CriarOS,
  ServiceOrderResponse,
  ServiceOrderResponseCreateSale,
} from "./serviceOrder.interface";
import type { Criador } from "./user.interface";
import type { PaymentResponse } from "./payment.interface";
import type { ClienteNomeGenero } from "./client.interface";
import type { Dates } from "./dates.interface";

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
  ordemServico?: ServiceOrderResponseCreateSale;
  atualizarQuantidades: {
    atualizados: ProductResponse[];
    erros: unknown[] | null;
  };
}

export type SaleResponse = Venda &
  Dates & {
    criador: Criador;
    ordemServico: ServiceOrderResponse | null;
    formaDePagamento: PaymentResponse;
    cliente: ClienteNomeGenero;
    vendasProdutos: VendaProdutoResponse[];
  };
