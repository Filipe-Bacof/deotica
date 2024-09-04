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

export type CriarOS = Omit<InserirOS, "vendaId" | "clienteId" | "createdBy">;

export type AtualizarStatusOS = Required<Pick<OrdemServico, "concluido">>;
