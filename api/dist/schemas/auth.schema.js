"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newPassSchema = exports.authLoginSchema = exports.authRegisterSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.authRegisterSchema = joi_1.default.object({
    nome: joi_1.default.string().required().messages({
        "string.empty": `O nome do usuário não pode estar vazio`,
        "any.required": `O nome do usuário é obrigatório`,
    }),
    email: joi_1.default.string().email().required().messages({
        "string.empty": `O email do usuário não pode estar vazio`,
        "any.required": `O email do usuário é obrigatório`,
        "string.email": `Informe um email válido`,
    }),
    senha: joi_1.default.string()
        .min(8)
        .pattern(/^(?=.*[a-zA-Z])(?=.*[0-9]).*$/)
        .required()
        .messages({
        "string.empty": `A senha não pode estar vazia`,
        "string.min": `A senha deve ter pelo menos {#limit} caracteres`,
        "string.pattern.base": `A senha deve conter pelo menos uma letra e um número`,
        "any.required": `A senha é obrigatória`,
    }),
    confirmarSenha: joi_1.default.string().valid(joi_1.default.ref("senha")).required().messages({
        "string.empty": `A confirmação de senha não pode estar vazia`,
        "any.only": `As senhas não correspondem`,
        "any.required": `A confirmação de senha é obrigatória`,
    }),
    perfilId: joi_1.default.number().required().messages({
        "any.required": `O perfil de usuário é obrigatório`,
        "number.base": `O perfil de usuário deve ser o número do Id`,
    }),
});
exports.authLoginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        "string.empty": `O email não pode estar vazio`,
        "string.email": `Informe um email válido`,
        "any.required": `O email é obrigatório`,
    }),
    senha: joi_1.default.string().required().messages({
        "string.empty": `A senha não pode estar vazia`,
        "any.required": `A senha é obrigatória`,
    }),
});
exports.newPassSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        "string.empty": `O email não pode estar vazio`,
        "string.email": `Informe um email válido`,
        "any.required": `O email é obrigatório`,
    }),
    senha: joi_1.default.string()
        .min(8)
        .pattern(/^(?=.*[a-zA-Z])(?=.*[0-9]).*$/)
        .required()
        .messages({
        "string.empty": `A senha não pode estar vazia`,
        "string.min": `A senha deve ter pelo menos {#limit} caracteres`,
        "string.pattern.base": `A senha deve conter pelo menos uma letra e um número`,
        "any.required": `A senha é obrigatória`,
    }),
    token: joi_1.default.string().required().messages({
        "string.empty": `O token não pode estar vazio`,
        "any.required": `O token é obrigatório`,
    }),
});
//# sourceMappingURL=auth.schema.js.map