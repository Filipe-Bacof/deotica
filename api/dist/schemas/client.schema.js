"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editClientSchema = exports.newClientSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const regex_1 = require("../utils/regex");
exports.newClientSchema = joi_1.default.object({
    nome: joi_1.default.string().pattern(regex_1.nomeRegex).required().messages({
        "string.empty": "O nome do usuário não pode estar vazio",
        "string.pattern.base": "O nome deve conter pelo menos um nome e um sobrenome",
        "any.required": "O nome do usuário é obrigatório",
    }),
    email: joi_1.default.string().email().required().messages({
        "string.empty": "O email do usuário não pode estar vazio",
        "string.email": "Informe um email válido",
        "any.required": "O email do usuário é obrigatório",
    }),
    cpf: joi_1.default.string().pattern(regex_1.cpfRegex).required().messages({
        "string.empty": "O CPF não pode estar vazio",
        "string.pattern.base": "O CPF deve conter exatamente 11 números sem caracteres especiais",
        "any.required": "O CPF é obrigatório",
    }),
    telefone: joi_1.default.string().required().messages({
        "string.empty": "O telefone não pode estar vazio",
        "any.required": "O telefone é obrigatório",
    }),
    dataNascimento: joi_1.default.date().optional().messages({
        "date.base": "A data de nascimento deve ser uma data válida",
    }),
    genero: joi_1.default.string()
        .valid("masculino", "feminino", "nao-informado")
        .optional()
        .messages({
        "any.only": `O gênero deve ser "masculino", "feminino" ou "nao-informado"`,
    }),
    cep: joi_1.default.string().pattern(regex_1.cepRegex).optional().messages({
        "string.pattern.base": "O CEP deve conter exatamente 8 números sem caracteres especiais",
    }),
    uf: joi_1.default.string().length(2).optional().messages({
        "string.length": "O UF deve conter exatamente 2 caracteres",
    }),
    cidade: joi_1.default.string().optional().messages({
        "string.empty": "A cidade não pode estar vazia",
    }),
    bairro: joi_1.default.string().optional().messages({
        "string.empty": "O bairro não pode estar vazio",
    }),
    endereco: joi_1.default.string().optional().messages({
        "string.empty": "O endereço não pode estar vazio",
    }),
    complemento: joi_1.default.string().optional(),
});
exports.editClientSchema = joi_1.default.object({
    nome: joi_1.default.string().pattern(regex_1.nomeRegex).optional().messages({
        "string.pattern.base": "O nome deve conter pelo menos um nome e um sobrenome",
    }),
    email: joi_1.default.string().email().optional().messages({
        "string.email": "Informe um email válido",
    }),
    cpf: joi_1.default.string().pattern(regex_1.cpfRegex).optional().messages({
        "string.pattern.base": "O CPF deve conter exatamente 11 números sem caracteres especiais",
    }),
    telefone: joi_1.default.string().optional().messages({
        "string.empty": "O telefone não pode estar vazio",
    }),
    dataNascimento: joi_1.default.date().optional().messages({
        "date.base": "A data de nascimento deve ser uma data válida",
    }),
    genero: joi_1.default.string()
        .valid("masculino", "feminino", "nao-informado")
        .optional()
        .messages({
        "any.only": `O gênero deve ser "masculino", "feminino" ou "nao-informado"`,
    }),
    cep: joi_1.default.string().pattern(regex_1.cepRegex).optional().messages({
        "string.pattern.base": "O CEP deve conter exatamente 8 números sem caracteres especiais",
    }),
    uf: joi_1.default.string().length(2).optional().messages({
        "string.length": "O UF deve conter exatamente 2 caracteres",
    }),
    cidade: joi_1.default.string().optional().messages({
        "string.empty": "A cidade não pode estar vazia",
    }),
    bairro: joi_1.default.string().optional().messages({
        "string.empty": "O bairro não pode estar vazio",
    }),
    endereco: joi_1.default.string().optional().messages({
        "string.empty": "O endereço não pode estar vazio",
    }),
    complemento: joi_1.default.string().optional(),
});
//# sourceMappingURL=client.schema.js.map