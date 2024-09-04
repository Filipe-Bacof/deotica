import Joi from "joi";
import { CriarEmailPromocional } from "../interfaces/promoEmail.interface";

export const promoEmailSchema = Joi.object<CriarEmailPromocional>({
  nome: Joi.string().required().messages({
    "string.empty": `O nome não pode estar vazio`,
    "any.required": `O nome é obrigatório`,
  }),
  email: Joi.string().email().required().messages({
    "string.empty": `O email não pode estar vazio`,
    "any.required": `O email é obrigatório`,
    "string.email": `Informe um email válido`,
  }),
});

export const promoEmailDesactivateSchema = Joi.object<{ email: string }>({
  email: Joi.string().email().required().messages({
    "string.empty": `O email não pode estar vazio`,
    "any.required": `O email é obrigatório`,
    "string.email": `Informe um email válido`,
  }),
});
