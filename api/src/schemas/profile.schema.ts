import Joi from "joi";
import { CriarPerfil, EditarPerfil } from "../interfaces/profile.interface";
import { Permission } from "../enum/Permissions";

export const newProfileSchema = Joi.object<CriarPerfil>({
  nome: Joi.string().required().messages({
    "string.empty": `O nome do perfil não pode estar vazio`,
    "any.required": `O nome do perfil é obrigatório`,
  }),
  permissoes: Joi.array()
    .items(Joi.string().valid(...Object.values(Permission)))
    .min(1)
    .required()
    .messages({
      "array.min": `Você deve enviar pelo menos um tipo de permissão`,
      "any.required": `As permissões do perfil são obrigatórias`,
      "any.only": `Permissões inválidas. As permissões devem ser uma das seguintes: ${Object.values(
        Permission
      ).join(" | ")}`,
    }),
});

export const editProfileSchema = Joi.object<EditarPerfil>({
  nome: Joi.string().optional().messages({
    "string.empty": `O nome do perfil não pode estar vazio`,
  }),
  permissoes: Joi.array()
    .items(Joi.string().valid(...Object.values(Permission)))
    .min(1)
    .optional()
    .messages({
      "array.min": `Você deve enviar pelo menos um tipo de permissão`,
      "any.only": `Permissões inválidas. As permissões devem ser uma das seguintes: ${Object.values(
        Permission
      ).join(", ")}`,
    }),
});
