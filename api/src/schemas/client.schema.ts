import Joi from "joi";
import { NovoCliente } from "../interfaces/client.interface";

export const newClientSchema = Joi.object<NovoCliente>({
  nome: Joi.string().required().messages({
    "string.empty": `O nome do usuário não pode estar vazio`,
    "any.required": `O nome do usuário é obrigatório`,
  }),
  email: Joi.string().email().required().messages({
    "string.empty": `O email do usuário não pode estar vazio`,
    "any.required": `O email do usuário é obrigatório`,
    "string.email": `Informe um email válido`,
  }),
  cpf: Joi.string().required(),
  telefone: Joi.string(),
  dataNascimento: Joi.date(),
  genero: Joi.string()
    .valid("masculino", "feminino", "nao-informado")
    .messages({
      "string.valid": `O gênero do client deve ser "masculino", "feminino" ou "nao-informado"`,
    }),
  cep: Joi.string(),
  uf: Joi.string(),
  cidade: Joi.string(),
  bairro: Joi.string(),
  endereco: Joi.string(),
  complemento: Joi.string(),
});
