import { VendaProduto } from "./product.interface";
import { CriarOS } from "./serviceOrder.interface";

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

export type CriarVenda = Omit<InserirVenda, "createdBy"> & {
  produtos: VendaProduto[];
  ordemServico?: CriarOS;
};
