"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProfileSchema = exports.newProfileSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const Permissions_1 = require("../enum/Permissions");
exports.newProfileSchema = joi_1.default.object({
    nome: joi_1.default.string().required().messages({
        "string.empty": `O nome do perfil não pode estar vazio`,
        "any.required": `O nome do perfil é obrigatório`,
    }),
    permissoes: joi_1.default.array()
        .items(joi_1.default.string().valid(...Object.values(Permissions_1.Permission)))
        .min(1)
        .required()
        .messages({
        "array.min": `Você deve enviar pelo menos um tipo de permissão`,
        "any.required": `As permissões do perfil são obrigatórias`,
        "any.only": `Permissões inválidas. As permissões devem ser uma das seguintes: ${Object.values(Permissions_1.Permission).join(" | ")}`,
    }),
});
exports.editProfileSchema = joi_1.default.object({
    nome: joi_1.default.string().optional().messages({
        "string.empty": `O nome do perfil não pode estar vazio`,
    }),
    permissoes: joi_1.default.array()
        .items(joi_1.default.string().valid(...Object.values(Permissions_1.Permission)))
        .min(1)
        .optional()
        .messages({
        "array.min": `Você deve enviar pelo menos um tipo de permissão`,
        "any.only": `Permissões inválidas. As permissões devem ser uma das seguintes: ${Object.values(Permissions_1.Permission).join(", ")}`,
    }),
});
//# sourceMappingURL=profile.schema.js.map