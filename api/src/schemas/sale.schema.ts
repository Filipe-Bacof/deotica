import Joi from "joi";
import { CriarVenda } from "../interfaces/sale.interface";
import { VendaProduto } from "../interfaces/product.interface";

const productSchema = Joi.object<VendaProduto>({
  id: Joi.string().required(),
  preco: Joi.number().required(),
  quantidade: Joi.number().required(),
});

export const newSaleSchema = Joi.object<CriarVenda>({
  formaDePagamentoId: Joi.number().required(),
  clienteId: Joi.string().required(),
  numeroDeParcelas: Joi.number().optional(),
  valorDeEntrada: Joi.number().required(),
  desconto: Joi.number().required(),
  produtos: Joi.array().items(productSchema.min(1)).required(),
});
