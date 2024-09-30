export interface FormaDePagamento {
  id: number;
  descricao: string;
  createdBy: string;
}

export type InserirFormaDePagamento = Omit<FormaDePagamento, "id">;

export type CriarFormaDePagamento = Omit<InserirFormaDePagamento, "createdBy">;

export type EditarFormaDePagamento = CriarFormaDePagamento;

export interface PaymentMethodResponse {
  id: number;
  descricao: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
