"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSaleSchema = exports.updateQuantityProductSchema = exports.editProductSchema = exports.newProductSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.newProductSchema = joi_1.default.object({
    nome: joi_1.default.string().required().messages({
        "string.empty": "O nome do produto não pode estar vazio",
        "any.required": "O nome do produto é obrigatório",
    }),
    quantidade: joi_1.default.number().min(0).optional().messages({
        "number.min": "A quantidade do produto não pode ser negativa",
        "number.base": "A quantidade deve ser um número válido",
    }),
    preco: joi_1.default.number().positive().precision(2).required().messages({
        "number.positive": "O preço do produto deve ser maior que zero",
        "number.base": "O preço deve ser um número válido com até duas casas decimais",
        "any.required": "O preço do produto é obrigatório",
    }),
    status: joi_1.default.boolean().optional().messages({
        "boolean.base": "O status deve ser verdadeiro ou falso",
    }),
    codigoDeBarras: joi_1.default.string().optional().messages({
        "string.base": "O código de barras deve ser uma string",
    }),
    marca: joi_1.default.string().optional().messages({
        "string.base": "A marca do produto deve ser uma string",
    }),
    modelo: joi_1.default.string().optional().messages({
        "string.base": "O modelo do produto deve ser uma string",
    }),
    tipo: joi_1.default.string().optional().messages({
        "string.base": "O tipo do produto deve ser uma string",
    }),
    genero: joi_1.default.string()
        .valid("masculino", "feminino", "unissex", "nao-informado")
        .optional()
        .messages({
        "any.only": `O gênero do produto deve ser "masculino", "feminino", "unissex" ou "nao-informado"`,
    }),
    produtoAtivo: joi_1.default.string().optional().messages({
        "string.base": "O produto ativo deve ser uma string",
    }),
});
exports.editProductSchema = joi_1.default.object({
    nome: joi_1.default.string().optional().messages({
        "string.empty": "O nome do produto não pode estar vazio",
    }),
    quantidade: joi_1.default.number().min(0).optional().messages({
        "number.min": "A quantidade do produto não pode ser negativa",
        "number.base": "A quantidade deve ser um número válido",
    }),
    preco: joi_1.default.number().positive().precision(2).optional().messages({
        "number.positive": "O preço do produto deve ser maior que zero",
        "number.base": "O preço deve ser um número válido com até duas casas decimais",
    }),
    status: joi_1.default.boolean().optional().messages({
        "boolean.base": "O status deve ser verdadeiro ou falso",
    }),
    codigoDeBarras: joi_1.default.string().optional().messages({
        "string.base": "O código de barras deve ser uma string",
    }),
    marca: joi_1.default.string().optional().messages({
        "string.base": "A marca do produto deve ser uma string",
    }),
    modelo: joi_1.default.string().optional().messages({
        "string.base": "O modelo do produto deve ser uma string",
    }),
    tipo: joi_1.default.string().optional().messages({
        "string.base": "O tipo do produto deve ser uma string",
    }),
    genero: joi_1.default.string()
        .valid("masculino", "feminino", "unissex", "nao-informado")
        .optional()
        .messages({
        "any.only": `O gênero do produto deve ser "masculino", "feminino", "unissex" ou "nao-informado"`,
    }),
    produtoAtivo: joi_1.default.string().optional().messages({
        "string.base": "O produto ativo deve ser uma string",
    }),
});
exports.updateQuantityProductSchema = joi_1.default.object({
    quantidade: joi_1.default.number().min(0).required().messages({
        "number.min": "A quantidade do produto não pode ser negativa",
        "number.base": "A quantidade deve ser um número válido",
        "any.required": "A quantidade do produto é obrigatória",
    }),
});
exports.productSaleSchema = joi_1.default.object({
    id: joi_1.default.string()
        .guid({ version: ["uuidv4"] })
        .required()
        .messages({
        "string.guid": "O ID do produto deve ser um UUID válido",
        "any.required": "O ID do produto é obrigatório",
    }),
    preco: joi_1.default.number().precision(2).positive().required().messages({
        "number.base": "O preço deve ser um número válido com até 2 casas decimais",
        "number.positive": "O preço deve ser maior que 0",
        "any.required": "O preço do produto é obrigatório",
    }),
    quantidade: joi_1.default.number().integer().min(1).required().messages({
        "number.base": "A quantidade deve ser um número válido",
        "number.min": "A quantidade deve ser maior ou igual a 1",
        "any.required": "A quantidade do produto é obrigatória",
    }),
});
//# sourceMappingURL=product.schema.js.map