import Joi from "joi";
import { CriarFormaDePagamento } from "../interfaces/payment.interface";

export const newPaymentMethodSchema = Joi.object<CriarFormaDePagamento>({
  descricao: Joi.string().required().messages({
    "string.empty": `A descrição não pode estar vazia`,
    "any.required": `A descrição é obrigatória`,
  }),
});
