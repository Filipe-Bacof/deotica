import { z } from "zod";

const createProductForm = z.object({
  nome: z.string().min(1, { message: "O nome do produto é obrigatório" }),
  quantidade: z.coerce
    .number()
    .min(0, { message: "A quantidade do produto não pode ser negativa" })
    .optional()
    .transform((val) => (val === null ? undefined : val)),
  preco: z.coerce
    .number({
      message:
        "O preço do produto precisa ser um número com casa decimal utilizando ponto",
    })
    .min(1, { message: "O preço do produto é obrigatório" }),
  status: z.boolean().optional(),
  codigoDeBarras: z
    .string()
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  marca: z
    .string()
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  modelo: z
    .string()
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  tipo: z
    .string()
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  genero: z.enum(["masculino", "feminino", "unissex", "nao-informado"]),
  produtoAtivo: z
    .string()
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
});

type CreateProductForm = z.infer<typeof createProductForm>;

const genderOptions = [
  { value: "masculino", text: "Masculino" },
  { value: "feminino", text: "Feminino" },
  { value: "unissex", text: "Unissex" },
  { value: "nao-informado", text: "Não Informado" },
];

export { createProductForm, type CreateProductForm, genderOptions };
