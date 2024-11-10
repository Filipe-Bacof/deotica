import type { VendaProduto } from "../interfaces/product.interface";
import type { CriarVendaRequest } from "../interfaces/sale.interface";
import type { CriarOS } from "../interfaces/serviceOrder.interface";

const produtoDefault: VendaProduto = {
  id: "",
  preco: 0,
  quantidade: 1,
};

const vendaDefault: CriarVendaRequest = {
  venda: {
    clienteId: "",
    desconto: 0,
    formaDePagamentoId: 0,
    valorDeEntrada: 0,
    numeroDeParcelas: 1,
  },
  produtos: [produtoDefault],
};

const ordemServicoDefault: CriarOS = {
  dataDeEntrega: undefined,
  olhoDireitoEsf: "",
  olhoDireitoCil: "",
  olhoDireitoEixo: "",
  olhoDireitoDNP: "",
  olhoDireitoAltura: "",
  olhoEsquerdoEsf: "",
  olhoEsquerdoCil: "",
  olhoEsquerdoEixo: "",
  olhoEsquerdoDNP: "",
  olhoEsquerdoAltura: "",
  adicao: "",
  modeloLente: "",
  tipoLente: undefined,
  corLente: "",
  tratamentos: "",
  tipoArmacaoAC: "0",
  tipoArmacaoME: "0",
  tipoArmacaoNY: "0",
  tipoArmacaoPA: "0",
  armacaoMD: "",
  armacaoTA: "",
  armacaoHoriz: "",
  armacaoPonte: "",
  armacaoVert: "",
  observacoes: "",
  concluido: undefined,
  somenteLente: "0",
  vaiTrazerArmacao: "0",
};

export { produtoDefault, vendaDefault, ordemServicoDefault };
