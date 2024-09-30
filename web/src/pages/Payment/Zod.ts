import { z } from "zod";

const createPaymentForm = z.object({
  descricao: z.string().min(1, "Descrição é obrigatória"),
});

type CreatePaymentForm = z.infer<typeof createPaymentForm>;

export { createPaymentForm, type CreatePaymentForm };
