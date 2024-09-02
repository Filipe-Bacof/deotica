import Joi from "joi";
import { CriarProduto } from "../interfaces/product.interface";

export const newProductSchema = Joi.object<CriarProduto>({
  nome: Joi.string().required().messages({
    "string.empty": `O nome do usuário não pode estar vazio`,
    "any.required": `O nome do usuário é obrigatório`,
  }),
  quantidade: Joi.number().optional(),
  preco: Joi.number().required(),
  status: Joi.boolean().optional(),
  codigoDeBarras: Joi.string().optional(),
  marca: Joi.string().optional(),
  modelo: Joi.string().optional(),
  tipo: Joi.string().optional(),
  genero: Joi.string()
    .optional()
    .valid("masculino", "feminino", "unissex", "nao-informado")
    .messages({
      "string.valid": `O gênero do client deve ser "masculino", "feminino", "unissex" ou "nao-informado"`,
    }),
  produtoAtivo: Joi.string().optional(),
});
