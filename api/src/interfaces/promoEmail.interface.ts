export interface EmailPromocional {
  id?: string;
  nome: string;
  email: string;
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CriarEmailPromocional = Pick<EmailPromocional, "nome" | "email">;