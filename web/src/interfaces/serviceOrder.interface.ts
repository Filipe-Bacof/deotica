import type { ClienteNomeGenero } from "./client.interface";
import type { Dates } from "./dates.interface";
import type { Venda } from "./sale.interface";
import type { Criador } from "./user.interface";

export interface OrdemServico {
  id: number;
  vendaId: string;
  clienteId: string;
  dataDeEntrega?: Date;
  concluido?: Concluido;
  olhoDireitoEsf?: string;
  olhoDireitoCil?: string;
  olhoDireitoEixo?: string;
  olhoDireitoDNP?: string;
  olhoDireitoAltura?: string;
  olhoEsquerdoEsf?: string;
  olhoEsquerdoCil?: string;
  olhoEsquerdoEixo?: string;
  olhoEsquerdoDNP?: string;
  olhoEsquerdoAltura?: string;
  adicao?: string;
  tipoLente?: TipoDeLente; // Desenhos
  corLente?: string;
  modeloLente?: string;
  tratamentos?: string;
  observacoes?: string;
  armacaoMD?: string;
  armacaoTA?: string;
  armacaoHoriz?: string;
  armacaoPonte?: string;
  armacaoVert?: string;
  tipoArmacaoAC?: "0" | "1";
  tipoArmacaoME?: "0" | "1";
  tipoArmacaoNY?: "0" | "1";
  tipoArmacaoPA?: "0" | "1";
  somenteLente?: "0" | "1";
  vaiTrazerArmacao?: "0" | "1";
  createdBy: string;
}

export type Concluido = "pendente" | "retirada" | "finalizado";

export type TipoDeLente = "1" | "2" | "3" | "4" | "5" | "6";

export type InserirOS = {
  vendaId: string;
  clienteId: string;
  dataDeEntrega?: Date;
  concluido?: Concluido;
  olhoDireitoEsf?: string;
  olhoDireitoCil?: string;
  olhoDireitoEixo?: string;
  olhoDireitoDNP?: string;
  olhoDireitoAltura?: string;
  olhoEsquerdoEsf?: string;
  olhoEsquerdoCil?: string;
  olhoEsquerdoEixo?: string;
  olhoEsquerdoDNP?: string;
  olhoEsquerdoAltura?: string;
  adicao?: string;
  tipoLente?: "1" | "2" | "3" | "4" | "5" | "6";
  corLente?: string;
  modeloLente?: string;
  tratamentos?: string;
  observacoes?: string;
  armacaoMD?: string;
  armacaoTA?: string;
  armacaoHoriz?: string;
  armacaoPonte?: string;
  armacaoVert?: string;
  tipoArmacaoAC?: boolean;
  tipoArmacaoME?: boolean;
  tipoArmacaoNY?: boolean;
  tipoArmacaoPA?: boolean;
  somenteLente?: boolean;
  vaiTrazerArmacao?: boolean;
  createdBy: string;
};

export type CriarOS = Partial<
  Omit<OrdemServico, "id" | "vendaId" | "clienteId" | "createdBy">
>;

export type EditarOS = Partial<
  Omit<InserirOS, "id" | "vendaId" | "clienteId" | "createdBy">
>;

export type AtualizarStatusOS = Required<Pick<OrdemServico, "concluido">>;

export interface ServiceOrderResponseCreateSale {
  id: number;
  vendaId: string;
  clienteId: string;
  dataDeEntrega: string | null;
  concluido: "pendente" | "retirada" | "finalizado";
  olhoDireitoEsf: string | null;
  olhoDireitoCil: string | null;
  olhoDireitoEixo: string | null;
  olhoDireitoDNP: string | null;
  olhoDireitoAltura: string | null;
  olhoEsquerdoEsf: string | null;
  olhoEsquerdoCil: string | null;
  olhoEsquerdoEixo: string | null;
  olhoEsquerdoDNP: string | null;
  olhoEsquerdoAltura: string | null;
  adicao: string | null;
  tipoLente: "1" | "2" | "3" | "4" | "5" | "6" | null; // Desenhos
  corLente: string | null;
  modeloLente: string | null;
  tratamentos: string | null;
  observacoes: string | null;
  armacaoMD: string | null;
  armacaoTA: string | null;
  armacaoHoriz: string | null;
  armacaoPonte: string | null;
  armacaoVert: string | null;
  tipoArmacaoAC: boolean;
  tipoArmacaoME: boolean;
  tipoArmacaoNY: boolean;
  tipoArmacaoPA: boolean;
  somenteLente: boolean;
  vaiTrazerArmacao: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export type ServiceOrderResponse = ServiceOrderResponseCreateSale & {
  criador: Criador;
  cliente: ClienteNomeGenero;
  venda: Venda & Dates;
};

export type ServiceOrderCount = {
  finalizado: number;
  pendente: number;
  retirada: number;
};
