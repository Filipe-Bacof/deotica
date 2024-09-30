import type { Criador } from "./user.interface";

export interface OrdemServico {
  id: number;
  vendaId: string;
  clienteId: string;
  dataDeEntrega?: Date;
  concluido?: "pendente" | "retirada" | "finalizado";
  olhoEsquerdo?: string;
  olhoDireito?: string;
  tipoLente?: string;
  corLente?: string;
  modeloLente?: string;
  tratamentos?: string;
  observacoes?: string;
  armacao?: string;
  tipoArmacao?: string;
  somenteLente?: boolean;
  createdBy: string;
}

export type InserirOS = Omit<OrdemServico, "id">;

export type CriarOS = Partial<
  Omit<InserirOS, "id" | "vendaId" | "clienteId" | "createdBy">
>;

export type EditarOS = CriarOS;

export type AtualizarStatusOS = Required<Pick<OrdemServico, "concluido">>;

export interface ServiceOrderResponseCreateSale {
  id: number;
  vendaId: string;
  clienteId: string;
  dataDeEntrega: string | null;
  concluido: string | null;
  olhoEsquerdo: string | null;
  olhoDireito: string | null;
  tipoLente: string | null;
  corLente: string | null;
  modeloLente: string | null;
  tratamentos: string | null;
  observacoes: string | null;
  armacao: string | null;
  tipoArmacao: string | null;
  somenteLente: boolean | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export type ServiceOrderResponse = ServiceOrderResponseCreateSale & Criador;
