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
  tipoLente?: "1" | "2" | "3" | "4" | "5" | "6"; // Desenhos
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
