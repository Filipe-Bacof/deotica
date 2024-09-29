import Joi from "joi";
import type {
  CriarVenda,
  CriarVendaRequest,
} from "../interfaces/sale.interface";
import { newServiceOrderSchema } from "./serviceOrder.schema";
import { productSaleSchema } from "./product.schema";

const saleSchema = Joi.object<CriarVenda>({
  formaDePagamentoId: Joi.number().integer().min(1).required().messages({
    "number.base":
      "O ID da forma de pagamento deve ser um número inteiro válido",
    "number.min": "O ID da forma de pagamento deve ser maior ou igual a 1",
    "any.required": "O ID da forma de pagamento é obrigatório",
  }),
  clienteId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.guid": "O ID do cliente deve ser um UUID válido",
      "any.required": "O ID do cliente é obrigatório",
    }),
  numeroDeParcelas: Joi.number().integer().min(1).optional().messages({
    "number.base": "O número de parcelas deve ser um número inteiro válido",
    "number.min": "O número de parcelas deve ser maior ou igual a 1",
  }),
  valorDeEntrada: Joi.number().precision(2).positive().required().messages({
    "number.base":
      "O valor de entrada deve ser um número válido com até 2 casas decimais",
    "number.positive": "O valor de entrada deve ser maior que 0",
    "any.required": "O valor de entrada é obrigatório",
  }),
  desconto: Joi.number().precision(2).required().messages({
    "number.base":
      "O desconto deve ser um número válido com até 2 casas decimais",
    "any.required": "O desconto é obrigatório",
  }),
});

export const newSaleSchema = Joi.object<CriarVendaRequest>({
  venda: saleSchema.required(),
  produtos: Joi.array().items(productSaleSchema).min(1).required().messages({
    "array.min": "Você deve informar pelo menos um produto",
    "any.required": "Os produtos são obrigatórios",
  }),
  ordemServico: newServiceOrderSchema.optional(),
});
