export interface FormaDePagamento {
  id: number;
  descricao: string;
  createdBy: string;
}

export type CriarFormaDePagamento = Omit<FormaDePagamento, "id" | "createdBy">;

export type InserirFormaDePagamento = Omit<FormaDePagamento, "id">;

export type EditarFormaDePagamento = Omit<FormaDePagamento, "id" | "createdBy">;
