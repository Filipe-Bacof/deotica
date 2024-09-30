import type { FormState, UseFormRegister } from "react-hook-form";
import type { CreatePaymentForm } from "../../pages/Payment/Zod";

type PaymentInputsProps = {
  register: UseFormRegister<CreatePaymentForm>;
  formState: FormState<CreatePaymentForm>;
};

export default function PaymentInputs({
  register,
  formState,
}: PaymentInputsProps) {
  return (
    <>
      <div className="flex w-full flex-col gap-2">
        <label htmlFor="descricao">Descrição*</label>
        <input
          type="text"
          id="descricao"
          required
          className="rounded-md border border-zinc-400 px-2 py-1"
          placeholder="Digite a descricao da forma de pagamento"
          {...register("descricao")}
        />
        {formState.errors.descricao && (
          <p className="text-sm text-red-400">
            {formState.errors.descricao.message}
          </p>
        )}
      </div>
    </>
  );
}
