import Joi from "joi";
import {
  AtualizarQuantidadeProduto,
  CriarProduto,
  EditarProduto,
} from "../interfaces/product.interface";

export const newProductSchema = Joi.object<CriarProduto>({
  nome: Joi.string().required().messages({
    "string.empty": `O nome do produto não pode estar vazio`,
    "any.required": `O nome do produto é obrigatório`,
  }),
  quantidade: Joi.number().min(0).optional().messages({
    "number.min": `A quantidade do produto não pode ser negativa`,
    "number.base": `A quantidade deve ser um número válido`,
  }),
  preco: Joi.number().positive().precision(2).required().messages({
    "number.positive": `O preço do produto deve ser maior que zero`,
    "number.base": `O preço deve ser um número válido com até duas casas decimais`,
    "any.required": `O preço do produto é obrigatório`,
  }),
  status: Joi.boolean().optional().messages({
    "boolean.base": `O status deve ser verdadeiro ou falso`,
  }),
  codigoDeBarras: Joi.string().optional().messages({
    "string.base": `O código de barras deve ser uma string`,
  }),
  marca: Joi.string().optional().messages({
    "string.base": `A marca do produto deve ser uma string`,
  }),
  modelo: Joi.string().optional().messages({
    "string.base": `O modelo do produto deve ser uma string`,
  }),
  tipo: Joi.string().optional().messages({
    "string.base": `O tipo do produto deve ser uma string`,
  }),
  genero: Joi.string()
    .valid("masculino", "feminino", "unissex", "nao-informado")
    .optional()
    .messages({
      "any.only": `O gênero do produto deve ser "masculino", "feminino", "unissex" ou "nao-informado"`,
    }),
  produtoAtivo: Joi.string().optional().messages({
    "string.base": `O produto ativo deve ser uma string`,
  }),
});

export const editProductSchema = Joi.object<EditarProduto>({
  nome: Joi.string().optional().messages({
    "string.empty": `O nome do produto não pode estar vazio`,
  }),
  quantidade: Joi.number().min(0).optional().messages({
    "number.min": `A quantidade do produto não pode ser negativa`,
    "number.base": `A quantidade deve ser um número válido`,
  }),
  preco: Joi.number().positive().precision(2).optional().messages({
    "number.positive": `O preço do produto deve ser maior que zero`,
    "number.base": `O preço deve ser um número válido com até duas casas decimais`,
  }),
  status: Joi.boolean().optional().messages({
    "boolean.base": `O status deve ser verdadeiro ou falso`,
  }),
  codigoDeBarras: Joi.string().optional().messages({
    "string.base": `O código de barras deve ser uma string`,
  }),
  marca: Joi.string().optional().messages({
    "string.base": `A marca do produto deve ser uma string`,
  }),
  modelo: Joi.string().optional().messages({
    "string.base": `O modelo do produto deve ser uma string`,
  }),
  tipo: Joi.string().optional().messages({
    "string.base": `O tipo do produto deve ser uma string`,
  }),
  genero: Joi.string()
    .valid("masculino", "feminino", "unissex", "nao-informado")
    .optional()
    .messages({
      "any.only": `O gênero do produto deve ser "masculino", "feminino", "unissex" ou "nao-informado"`,
    }),
  produtoAtivo: Joi.string().optional().messages({
    "string.base": `O produto ativo deve ser uma string`,
  }),
});

export const updateQuantityProductSchema =
  Joi.object<AtualizarQuantidadeProduto>({
    quantidade: Joi.number().min(0).required().messages({
      "number.min": `A quantidade do produto não pode ser negativa`,
      "number.base": `A quantidade deve ser um número válido`,
      "any.required": `A quantidade do produto é obrigatória`,
    }),
  });
