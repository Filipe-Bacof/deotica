"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateServiceOrderStatusSchema = exports.editServiceOrderSchema = exports.newServiceOrderSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.newServiceOrderSchema = joi_1.default.object({
    dataDeEntrega: joi_1.default.string().isoDate().optional().messages({
        "string.isoDate": `A data de entrega deve estar no formato ISO: "YYYY-MM-DDTHH:mm:ss.sssZ"`,
    }),
    concluido: joi_1.default.string()
        .valid("pendente", "retirada", "finalizado")
        .optional()
        .messages({
        "any.only": `O status de conclusão deve ser "pendente", "retirada" ou "finalizado"`,
    }),
    olhoEsquerdo: joi_1.default.string().optional().allow(null, "").messages({
        "string.empty": `O campo "olho esquerdo" não pode estar vazio se informado`,
    }),
    olhoDireito: joi_1.default.string().optional().allow(null, "").messages({
        "string.empty": `O campo "olho direito" não pode estar vazio se informado`,
    }),
    tipoLente: joi_1.default.string().optional().allow(null, "").messages({
        "string.empty": `O campo "tipo de lente" não pode estar vazio se informado`,
    }),
    corLente: joi_1.default.string().optional().allow(null, "").messages({
        "string.empty": `O campo "cor da lente" não pode estar vazio se informado`,
    }),
    modeloLente: joi_1.default.string().optional().allow(null, "").messages({
        "string.empty": `O campo "modelo da lente" não pode estar vazio se informado`,
    }),
    tratamentos: joi_1.default.string().optional().allow(null, "").messages({
        "string.empty": `O campo "tratamentos" não pode estar vazio se informado`,
    }),
    observacoes: joi_1.default.string().optional().allow(null, "").messages({
        "string.empty": `O campo "observações" não pode estar vazio se informado`,
    }),
    armacao: joi_1.default.string().optional().allow(null, "").messages({
        "string.empty": `O campo "armação" não pode estar vazio se informado`,
    }),
    tipoArmacao: joi_1.default.string().optional().allow(null, "").messages({
        "string.empty": `O campo "tipo de armação" não pode estar vazio se informado`,
    }),
    somenteLente: joi_1.default.boolean().optional().messages({
        "boolean.base": `O campo "somente lente" deve ser um valor booleano`,
    }),
});
exports.editServiceOrderSchema = exports.newServiceOrderSchema;
exports.updateServiceOrderStatusSchema = joi_1.default.object({
    concluido: joi_1.default.string()
        .valid("pendente", "retirada", "finalizado")
        .required()
        .messages({
        "any.required": `É obrigatório informar o campo "concluido" para atualizar o status`,
        "any.only": `O status de conclusão deve ser "pendente", "retirada" ou "finalizado"`,
    }),
});
//# sourceMappingURL=serviceOrder.schema.js.map