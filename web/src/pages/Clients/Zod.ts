import { z } from "zod";

const createClientForm = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  cpf: z
    .string()
    .min(11, "CPF deve ter 11 dígitos")
    .max(11, "CPF deve ter 11 dígitos"),
  telefone: z.string().min(10, "O telefone é obrigatório"),
  email: z
    .string()
    .email("Email inválido")
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  dataNascimento: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(`${val}T00:00:00.000Z`) : undefined)),
  genero: z.enum(["masculino", "feminino", "nao-informado"]).optional(),
  cep: z
    .string()
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  uf: z
    .string()
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  cidade: z
    .string()
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  bairro: z
    .string()
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  endereco: z
    .string()
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  complemento: z
    .string()
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
});

type CreateClientForm = z.infer<typeof createClientForm>;

const genderOptions = [
  { value: "masculino", text: "Masculino" },
  { value: "feminino", text: "Feminino" },
  { value: "nao-informado", text: "Não Informado" },
];

export { createClientForm, type CreateClientForm, genderOptions };
