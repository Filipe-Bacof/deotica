import Joi from "joi";
import { CriarVenda } from "../interfaces/sale.interface";
import { VendaProduto } from "../interfaces/product.interface";
import { CriarOS } from "../interfaces/serviceOrder.interface";

const productSchema = Joi.object<VendaProduto>({
  id: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.guid": `O ID do produto deve ser um UUID válido`,
      "any.required": `O ID do produto é obrigatório`,
    }),
  preco: Joi.number().precision(2).positive().required().messages({
    "number.base": `O preço deve ser um número válido com até 2 casas decimais`,
    "number.positive": `O preço deve ser maior que 0`,
    "any.required": `O preço do produto é obrigatório`,
  }),
  quantidade: Joi.number().integer().min(1).required().messages({
    "number.base": `A quantidade deve ser um número válido`,
    "number.min": `A quantidade deve ser maior ou igual a 1`,
    "any.required": `A quantidade do produto é obrigatória`,
  }),
});

const serviceOrderSchema = Joi.object<CriarOS>({
  dataDeEntrega: Joi.string().isoDate().optional().messages({
    "string.isoDate": `A data de entrega deve estar no formato ISO: "YYYY-MM-DDTHH:mm:ss.sssZ"`,
  }),
  concluido: Joi.string()
    .valid("pendente", "retirada", "finalizado")
    .optional()
    .messages({
      "any.only": `O status de conclusão deve ser "pendente", "retirada" ou "finalizado"`,
    }),
  olhoEsquerdo: Joi.string().optional().allow(null, "").messages({
    "string.empty": `O campo "olho esquerdo" não pode estar vazio se informado`,
  }),
  olhoDireito: Joi.string().optional().allow(null, "").messages({
    "string.empty": `O campo "olho direito" não pode estar vazio se informado`,
  }),
  tipoLente: Joi.string().optional().allow(null, "").messages({
    "string.empty": `O campo "tipo de lente" não pode estar vazio se informado`,
  }),
  corLente: Joi.string().optional().allow(null, "").messages({
    "string.empty": `O campo "cor da lente" não pode estar vazio se informado`,
  }),
  modeloLente: Joi.string().optional().allow(null, "").messages({
    "string.empty": `O campo "modelo da lente" não pode estar vazio se informado`,
  }),
  tratamentos: Joi.string().optional().allow(null, "").messages({
    "string.empty": `O campo "tratamentos" não pode estar vazio se informado`,
  }),
  observacoes: Joi.string().optional().allow(null, "").messages({
    "string.empty": `O campo "observações" não pode estar vazio se informado`,
  }),
  armacao: Joi.string().optional().allow(null, "").messages({
    "string.empty": `O campo "armação" não pode estar vazio se informado`,
  }),
  tipoArmacao: Joi.string().optional().allow(null, "").messages({
    "string.empty": `O campo "tipo de armação" não pode estar vazio se informado`,
  }),
  somenteLente: Joi.boolean().optional().messages({
    "boolean.base": `O campo "somente lente" deve ser um valor booleano`,
  }),
});

export const newSaleSchema = Joi.object<CriarVenda>({
  formaDePagamentoId: Joi.number().integer().min(1).required().messages({
    "number.base": `O ID da forma de pagamento deve ser um número inteiro válido`,
    "number.min": `O ID da forma de pagamento deve ser maior ou igual a 1`,
    "any.required": `O ID da forma de pagamento é obrigatório`,
  }),
  clienteId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.guid": `O ID do cliente deve ser um UUID válido`,
      "any.required": `O ID do cliente é obrigatório`,
    }),
  numeroDeParcelas: Joi.number().integer().min(1).optional().messages({
    "number.base": `O número de parcelas deve ser um número inteiro válido`,
    "number.min": `O número de parcelas deve ser maior ou igual a 1`,
  }),
  valorDeEntrada: Joi.number().precision(2).positive().required().messages({
    "number.base": `O valor de entrada deve ser um número válido com até 2 casas decimais`,
    "number.positive": `O valor de entrada deve ser maior que 0`,
    "any.required": `O valor de entrada é obrigatório`,
  }),
  desconto: Joi.number().precision(2).required().messages({
    "number.base": `O desconto deve ser um número válido com até 2 casas decimais`,
    "any.required": `O desconto é obrigatório`,
  }),
  produtos: Joi.array().items(productSchema).min(1).required().messages({
    "array.min": `Você deve informar pelo menos um produto`,
    "any.required": `Os produtos são obrigatórios`,
  }),
  ordemServico: serviceOrderSchema.optional(),
});
