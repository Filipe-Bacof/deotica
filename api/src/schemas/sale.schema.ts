import Joi from "joi";
import { CriarVenda } from "../interfaces/sale.interface";
import { VendaProduto } from "../interfaces/product.interface";
import { CriarOS } from "../interfaces/serviceOrder.interface";

const productSchema = Joi.object<VendaProduto>({
  id: Joi.string().required(),
  preco: Joi.number().required(),
  quantidade: Joi.number().required(),
});

const serviceOrderSchema = Joi.object<CriarOS>({
  dataDeEntrega: Joi.date().optional(),
  concluido: Joi.string().optional(),
  olhoEsquerdo: Joi.string().optional(),
  olhoDireito: Joi.string().optional(),
  tipoLente: Joi.string().optional(),
  corLente: Joi.string().optional(),
  modeloLente: Joi.string().optional(),
  tratamentos: Joi.string().optional(),
  observacoes: Joi.string().optional(),
  armacao: Joi.string().optional(),
  tipoArmacao: Joi.string().optional(),
  somenteLente: Joi.boolean().optional(),
});

export const newSaleSchema = Joi.object<CriarVenda>({
  formaDePagamentoId: Joi.number().required(),
  clienteId: Joi.string().required(),
  numeroDeParcelas: Joi.number().optional(),
  valorDeEntrada: Joi.number().required(),
  desconto: Joi.number().required(),
  produtos: Joi.array().items(productSchema.min(1)).required(),
  ordemServico: Joi.object(serviceOrderSchema).optional(),
});
