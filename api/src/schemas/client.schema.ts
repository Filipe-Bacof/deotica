import Joi from "joi";
import type {
  CriarCliente,
  EditarCliente,
} from "../interfaces/client.interface";
import { cepRegex, cpfRegex, nomeRegex } from "../utils/regex";

export const newClientSchema = Joi.object<CriarCliente>({
  nome: Joi.string().pattern(nomeRegex).required().messages({
    "string.empty": "O nome do usuário não pode estar vazio",
    "string.pattern.base":
      "O nome deve conter pelo menos um nome e um sobrenome",
    "any.required": "O nome do usuário é obrigatório",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "O email do usuário não pode estar vazio",
    "string.email": "Informe um email válido",
    "any.required": "O email do usuário é obrigatório",
  }),
  cpf: Joi.string().pattern(cpfRegex).required().messages({
    "string.empty": "O CPF não pode estar vazio",
    "string.pattern.base":
      "O CPF deve conter exatamente 11 números sem caracteres especiais",
    "any.required": "O CPF é obrigatório",
  }),
  telefone: Joi.string().required().messages({
    "string.empty": "O telefone não pode estar vazio",
    "any.required": "O telefone é obrigatório",
  }),
  dataNascimento: Joi.date().optional().messages({
    "date.base": "A data de nascimento deve ser uma data válida",
  }),
  genero: Joi.string()
    .valid("masculino", "feminino", "nao-informado")
    .optional()
    .messages({
      "any.only": `O gênero deve ser "masculino", "feminino" ou "nao-informado"`,
    }),
  cep: Joi.string().pattern(cepRegex).optional().messages({
    "string.pattern.base":
      "O CEP deve conter exatamente 8 números sem caracteres especiais",
  }),
  uf: Joi.string().length(2).optional().messages({
    "string.length": "O UF deve conter exatamente 2 caracteres",
  }),
  cidade: Joi.string().optional().messages({
    "string.empty": "A cidade não pode estar vazia",
  }),
  bairro: Joi.string().optional().messages({
    "string.empty": "O bairro não pode estar vazio",
  }),
  endereco: Joi.string().optional().messages({
    "string.empty": "O endereço não pode estar vazio",
  }),
  complemento: Joi.string().optional(),
});

export const editClientSchema = Joi.object<EditarCliente>({
  nome: Joi.string().pattern(nomeRegex).optional().messages({
    "string.pattern.base":
      "O nome deve conter pelo menos um nome e um sobrenome",
  }),
  email: Joi.string().email().optional().messages({
    "string.email": "Informe um email válido",
  }),
  cpf: Joi.string().pattern(cpfRegex).optional().messages({
    "string.pattern.base":
      "O CPF deve conter exatamente 11 números sem caracteres especiais",
  }),
  telefone: Joi.string().optional().messages({
    "string.empty": "O telefone não pode estar vazio",
  }),
  dataNascimento: Joi.date().optional().messages({
    "date.base": "A data de nascimento deve ser uma data válida",
  }),
  genero: Joi.string()
    .valid("masculino", "feminino", "nao-informado")
    .optional()
    .messages({
      "any.only": `O gênero deve ser "masculino", "feminino" ou "nao-informado"`,
    }),
  cep: Joi.string().pattern(cepRegex).optional().messages({
    "string.pattern.base":
      "O CEP deve conter exatamente 8 números sem caracteres especiais",
  }),
  uf: Joi.string().length(2).optional().messages({
    "string.length": "O UF deve conter exatamente 2 caracteres",
  }),
  cidade: Joi.string().optional().messages({
    "string.empty": "A cidade não pode estar vazia",
  }),
  bairro: Joi.string().optional().messages({
    "string.empty": "O bairro não pode estar vazio",
  }),
  endereco: Joi.string().optional().messages({
    "string.empty": "O endereço não pode estar vazio",
  }),
  complemento: Joi.string().optional(),
});
