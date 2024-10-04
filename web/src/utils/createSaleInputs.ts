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
  armacao: "",
  concluido: "pendente",
  corLente: "",
  dataDeEntrega: undefined,
  modeloLente: "",
  observacoes: "",
  olhoDireito: "",
  olhoEsquerdo: "",
  somenteLente: false,
  tipoArmacao: "",
  tipoLente: "",
  tratamentos: "",
};

export { produtoDefault, vendaDefault, ordemServicoDefault };
