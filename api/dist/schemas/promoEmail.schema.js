"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isClientSchema = exports.promoEmailSendSimpleMessageSchema = exports.promoEmailDesactivateSchema = exports.promoEmailSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.promoEmailSchema = joi_1.default.object({
    nome: joi_1.default.string().required().messages({
        "string.empty": "O nome não pode estar vazio",
        "any.required": "O nome é obrigatório",
    }),
    email: joi_1.default.string().email().required().messages({
        "string.empty": "O email não pode estar vazio",
        "any.required": "O email é obrigatório",
        "string.email": "Informe um email válido",
    }),
});
exports.promoEmailDesactivateSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        "string.empty": "O email não pode estar vazio",
        "any.required": "O email é obrigatório",
        "string.email": "Informe um email válido",
    }),
});
exports.promoEmailSendSimpleMessageSchema = joi_1.default.object({
    emails: joi_1.default.array()
        .items(joi_1.default.string().email().required().messages({
        "string.empty": "O email não pode estar vazio",
        "any.required": "O email é obrigatório",
        "string.email": "Informe um email válido",
    }))
        .min(1)
        .required()
        .messages({
        "array.min": "Pelo menos um email é necessário.",
        "any.required": "O array de emails é obrigatório.",
    }),
    message: joi_1.default.string().min(1).required().messages({
        "string.empty": "A mensagem não pode estar vazia",
        "any.required": "A mensagem é obrigatória",
        "string.min": "A mensagem deve ter pelo menos 1 caractere.",
    }),
});
exports.isClientSchema = exports.promoEmailDesactivateSchema;
//# sourceMappingURL=promoEmail.schema.js.map