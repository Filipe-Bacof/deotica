import Joi from "joi";
import { AtualizarStatusOS } from "../interfaces/serviceOrder.interface";

export const updateServiceOrderStatusSchema = Joi.object<AtualizarStatusOS>({
  concluido: Joi.string()
    .valid("pendente", "retirada", "finalizado")
    .required()
    .messages({
      "any.required": `É obrigatório informar o campo "concluido" para atualizar o status`,
      "any.only": `O status de conclusão deve ser "pendente", "retirada" ou "finalizado"`,
    }),
});
