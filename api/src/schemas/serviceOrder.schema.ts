import Joi from "joi";
import type {
  AtualizarStatusOS,
  CriarOS,
} from "../interfaces/serviceOrder.interface";

export const newServiceOrderSchema = Joi.object<CriarOS>({
  dataDeEntrega: Joi.string().isoDate().optional().messages({
    "string.isoDate": `A data de entrega deve estar no formato ISO: "YYYY-MM-DDTHH:mm:ss.sssZ"`,
  }),
  concluido: Joi.string()
    .valid("pendente", "retirada", "finalizado")
    .optional()
    .messages({
      "any.only": `O status de conclusão deve ser "pendente", "retirada" ou "finalizado"`,
    }),
  olhoDireitoEsf: Joi.string().optional().allow(null, "").messages({
    "string.empty": `O campo "Olho Direito Esférico" não pode estar vazio se informado`,
  }),
  olhoDireitoCil: Joi.string().optional().allow(null, "").messages({
    "string.empty": `O campo "Olho Direito Cilíndrico" não pode estar vazio se informado`,
  }),
  olhoDireitoEixo: Joi.string().optional().allow(null, "").messages({
    "string.empty": `O campo "Olho Direito Eixo" não pode estar vazio se informado`,
  }),
  olhoDireitoDNP: Joi.string().optional().allow(null, "").messages({
    "string.empty": `O campo "Olho Direito Distância Naso Pupilar" não pode estar vazio se informado`,
  }),
  olhoDireitoAltura: Joi.string().optional().allow(null, "").messages({
    "string.empty": `O campo "Olho Direito Altura" não pode estar vazio se informado`,
  }),
  olhoEsquerdoEsf: Joi.string().optional().allow(null, "").messages({
    "string.empty": `O campo "Olho Esquerdo Esférico" não pode estar vazio se informado`,
  }),
  olhoEsquerdoCil: Joi.string().optional().allow(null, "").messages({
    "string.empty": `O campo "Olho Esquerdo Cilíndrico" não pode estar vazio se informado`,
  }),
  olhoEsquerdoEixo: Joi.string().optional().allow(null, "").messages({
    "string.empty": `O campo "Olho Esquerdo Eixo" não pode estar vazio se informado`,
  }),
  olhoEsquerdoDNP: Joi.string().optional().allow(null, "").messages({
    "string.empty": `O campo "Olho Esquerdo Distância Naso Pupilar" não pode estar vazio se informado`,
  }),
  olhoEsquerdoAltura: Joi.string().optional().allow(null, "").messages({
    "string.empty": `O campo "Olho Esquerdo Altura" não pode estar vazio se informado`,
  }),
  adicao: Joi.string().optional().allow(null, "").messages({
    "string.empty": `O campo "Adição" não pode estar vazio se informado`,
  }),
  tipoLente: Joi.string()
    .valid("1", "2", "3", "4", "5", "6")
    .optional()
    .messages({
      "any.only": `O tipo de lente deve ser correspondente ao desenho | Exemplo: "1"`,
    }),
  corLente: Joi.string().optional().allow(null, "").messages({
    "string.empty": `O campo "cor da lente" não pode estar vazio se informado`,
  }),
  modeloLente: Joi.string().optional().allow(null, "").messages({
    "string.empty": `O campo "modelo da lente" não pode estar vazio se informado`,
  }),
  tratamentos: Joi.string().optional().allow(null, "").messages({
    "string.empty": `O campo "tratamentos" não pode estar vazio se informado`,
  }),
  observacoes: Joi.string().optional().allow(null, "").messages({
    "string.empty": `O campo "observações" não pode estar vazio se informado`,
  }),
  armacaoMD: Joi.string().optional().allow(null, "").messages({
    "string.empty": `O campo "Armação Maior Diagonal" não pode estar vazio se informado`,
  }),
  armacaoTA: Joi.string().optional().allow(null, "").messages({
    "string.empty": `O campo "Armação Tamanho da Armação" não pode estar vazio se informado`,
  }),
  armacaoHoriz: Joi.string().optional().allow(null, "").messages({
    "string.empty": `O campo "Armação Horizontal" não pode estar vazio se informado`,
  }),
  armacaoPonte: Joi.string().optional().allow(null, "").messages({
    "string.empty": `O campo "Armação Ponte" não pode estar vazio se informado`,
  }),
  armacaoVert: Joi.string().optional().allow(null, "").messages({
    "string.empty": `O campo "Armação Vertical" não pode estar vazio se informado`,
  }),
  tipoArmacaoAC: Joi.string().valid("0", "1").optional().messages({
    "any.only": `O campo "Tipo de Armação Acetato" deve ser um boolean em formato string "0" ou "1" caso informado`,
  }),
  tipoArmacaoME: Joi.string().valid("0", "1").optional().messages({
    "any.only": `O campo "Tipo de Armação Metal" deve ser um boolean em formato string "0" ou "1" caso informado`,
  }),
  tipoArmacaoNY: Joi.string().valid("0", "1").optional().messages({
    "any.only": `O campo "Tipo de Armação Nylon" deve ser um boolean em formato string "0" ou "1" caso informado`,
  }),
  tipoArmacaoPA: Joi.string().valid("0", "1").optional().messages({
    "any.only": `O campo "Tipo de Armação Três Peças" deve ser um boolean em formato string "0" ou "1" caso informado`,
  }),
  somenteLente: Joi.string().valid("0", "1").optional().messages({
    "any.only": `O campo "Somente Lente" deve ser um boolean em formato string "0" ou "1" caso informado`,
  }),
  vaiTrazerArmacao: Joi.string().valid("0", "1").optional().messages({
    "any.only": `O campo "Vai Trazer Armação" deve ser um boolean em formato string "0" ou "1" caso informado`,
  }),
});

export const editServiceOrderSchema = newServiceOrderSchema;

export const updateServiceOrderStatusSchema = Joi.object<AtualizarStatusOS>({
  concluido: Joi.string()
    .valid("pendente", "retirada", "finalizado")
    .required()
    .messages({
      "any.required": `É obrigatório informar o campo "concluido" para atualizar o status`,
      "any.only": `O status de conclusão deve ser "pendente", "retirada" ou "finalizado"`,
    }),
});
