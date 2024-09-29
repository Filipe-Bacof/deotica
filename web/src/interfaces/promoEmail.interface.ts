export interface EmailPromocional {
  id?: string;
  nome: string;
  email: string;
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CriarEmailPromocional = Pick<EmailPromocional, "nome" | "email">;

export type DesativarEmailPromocional = Pick<EmailPromocional, "email">;

export type VerificarEmailPromocional = DesativarEmailPromocional;

export type EmailPromocionalResponse = Required<EmailPromocional>;

export interface SendSimpleMessage {
  emails: string[];
  message: string;
}

export interface SendSimpleMessageResponse {
  email: string;
  status: boolean;
}
