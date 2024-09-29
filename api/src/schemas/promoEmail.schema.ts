import Joi from "joi";
import type {
  CriarEmailPromocional,
  SendSimpleMessage,
} from "../interfaces/promoEmail.interface";

export const promoEmailSchema = Joi.object<CriarEmailPromocional>({
  nome: Joi.string().required().messages({
    "string.empty": "O nome não pode estar vazio",
    "any.required": "O nome é obrigatório",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "O email não pode estar vazio",
    "any.required": "O email é obrigatório",
    "string.email": "Informe um email válido",
  }),
});

export const promoEmailDesactivateSchema = Joi.object<{ email: string }>({
  email: Joi.string().email().required().messages({
    "string.empty": "O email não pode estar vazio",
    "any.required": "O email é obrigatório",
    "string.email": "Informe um email válido",
  }),
});

export const promoEmailSendSimpleMessageSchema = Joi.object<SendSimpleMessage>({
  emails: Joi.array()
    .items(
      Joi.string().email().required().messages({
        "string.empty": "O email não pode estar vazio",
        "any.required": "O email é obrigatório",
        "string.email": "Informe um email válido",
      })
    )
    .min(1)
    .required()
    .messages({
      "array.min": "Pelo menos um email é necessário.",
      "any.required": "O array de emails é obrigatório.",
    }),
  message: Joi.string().min(1).required().messages({
    "string.empty": "A mensagem não pode estar vazia",
    "any.required": "A mensagem é obrigatória",
    "string.min": "A mensagem deve ter pelo menos 1 caractere.",
  }),
});

export const isClientSchema = promoEmailDesactivateSchema;
