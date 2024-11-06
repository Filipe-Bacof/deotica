"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newPaymentMethodSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.newPaymentMethodSchema = joi_1.default.object({
    descricao: joi_1.default.string().required().messages({
        "string.empty": "A descrição não pode estar vazia",
        "any.required": "A descrição é obrigatória",
    }),
});
//# sourceMappingURL=payment.schema.js.map