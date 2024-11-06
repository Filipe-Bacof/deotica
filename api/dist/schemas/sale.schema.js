"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newSaleSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const serviceOrder_schema_1 = require("./serviceOrder.schema");
const product_schema_1 = require("./product.schema");
const saleSchema = joi_1.default.object({
    formaDePagamentoId: joi_1.default.number().integer().min(1).required().messages({
        "number.base": "O ID da forma de pagamento deve ser um número inteiro válido",
        "number.min": "O ID da forma de pagamento deve ser maior ou igual a 1",
        "any.required": "O ID da forma de pagamento é obrigatório",
    }),
    clienteId: joi_1.default.string()
        .guid({ version: ["uuidv4"] })
        .required()
        .messages({
        "string.guid": "O ID do cliente deve ser um UUID válido",
        "any.required": "O ID do cliente é obrigatório",
    }),
    numeroDeParcelas: joi_1.default.number().integer().min(1).optional().messages({
        "number.base": "O número de parcelas deve ser um número inteiro válido",
        "number.min": "O número de parcelas deve ser maior ou igual a 1",
    }),
    valorDeEntrada: joi_1.default.number().precision(2).positive().required().messages({
        "number.base": "O valor de entrada deve ser um número válido com até 2 casas decimais",
        "number.positive": "O valor de entrada deve ser maior que 0",
        "any.required": "O valor de entrada é obrigatório",
    }),
    desconto: joi_1.default.number().precision(2).required().messages({
        "number.base": "O desconto deve ser um número válido com até 2 casas decimais",
        "any.required": "O desconto é obrigatório",
    }),
});
exports.newSaleSchema = joi_1.default.object({
    venda: saleSchema.required(),
    produtos: joi_1.default.array().items(product_schema_1.productSaleSchema).min(1).required().messages({
        "array.min": "Você deve informar pelo menos um produto",
        "any.required": "Os produtos são obrigatórios",
    }),
    ordemServico: serviceOrder_schema_1.newServiceOrderSchema.optional(),
});
//# sourceMappingURL=sale.schema.js.map