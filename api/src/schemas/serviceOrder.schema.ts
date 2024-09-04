import Joi from "joi";
import {
  AtualizarStatusOS,
  CriarOS,
} from "../interfaces/serviceOrder.interface";

export const newServiceOrderSchema = Joi.object<CriarOS>({
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

export const editServiceOrderSchema = newServiceOrderSchema;

export const updateServiceOrderStatusSchema = Joi.object<AtualizarStatusOS>({
  concluido: Joi.string()
    .valid("pendente", "retirada", "finalizado")
    .required()
    .messages({
      "any.required": `É obrigatório informar o campo "concluido" para atualizar o status`,
      "any.only": `O status de conclusão deve ser "pendente", "retirada" ou "finalizado"`,
    }),
});
