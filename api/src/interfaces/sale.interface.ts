import type { VendaProduto } from "./product.interface";
import type { CriarOS } from "./serviceOrder.interface";

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

export type VendaCriada = {
  id: string;
  formaDePagamentoId: number;
  clienteId: string;
  numeroDeParcelas: number;
  valorDeEntrada: number;
  desconto: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
};
