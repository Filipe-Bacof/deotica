import Joi from "joi";
import { Perfil } from "../interfaces/profile.interface";

export const profileSchema = Joi.object<Perfil>({
  nome: Joi.string().required().messages({
    "string.empty": `O nome do Perfil não pode estar vazio`,
    "any.required": `O nome do Perfil é obrigatório`,
  }),
  permissoes: Joi.array().items(Joi.string()).min(1).required().messages({
    "array.min": `Você deve enviar pelo menos um tipo de permissão`,
    "any.required": `As permissões do perfil são obrigatórias`,
    // "array.items": `Verifique os itens permitidos`,
  }),
});
