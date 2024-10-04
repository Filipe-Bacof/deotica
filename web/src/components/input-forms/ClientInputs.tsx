import {
  type Control,
  Controller,
  type FormState,
  type UseFormRegister,
} from "react-hook-form";
import { genderOptions, type CreateClientForm } from "../../pages/Clients/Zod";
import { RadioGroup, RadioGroupIndicator, RadioGroupItem } from "../RadioGroup";

type ClientInputsProps = {
  register: UseFormRegister<CreateClientForm>;
  formState: FormState<CreateClientForm>;
  control: Control<CreateClientForm>;
};

export default function ClientInputs({
  register,
  formState,
  control,
}: ClientInputsProps) {
  return (
    <>
      <div className="flex w-full flex-col gap-2">
        <label htmlFor="nome">Nome*</label>
        <input
          type="text"
          id="nome"
          required
          className="rounded-md border border-zinc-400 px-2 py-1"
          placeholder="Digite o nome do cliente"
          {...register("nome")}
        />
        {formState.errors.nome && (
          <p className="text-sm text-red-400">
            {formState.errors.nome.message}
          </p>
        )}
      </div>
      <div className="flex w-full flex-col gap-2">
        <label htmlFor="cpf">CPF*</label>
        <input
          type="text"
          id="cpf"
          required
          className="rounded-md border border-zinc-400 px-2 py-1"
          placeholder="Digite o cpf do cliente sem pontuação"
          {...register("cpf")}
        />
        {formState.errors.cpf && (
          <p className="text-sm text-red-400">{formState.errors.cpf.message}</p>
        )}
      </div>
      <div className="flex w-full flex-col gap-2">
        <label htmlFor="telefone">Telefone*</label>
        <input
          type="text"
          id="telefone"
          required
          className="rounded-md border border-zinc-400 px-2 py-1"
          placeholder="Digite o telefone do cliente"
          {...register("telefone")}
        />
        {formState.errors.telefone && (
          <p className="text-sm text-red-400">
            {formState.errors.telefone.message}
          </p>
        )}
      </div>
      <div className="flex w-full flex-col gap-2">
        <label htmlFor="email">E-mail*</label>
        <input
          type="email"
          id="email"
          required
          className="rounded-md border border-zinc-400 px-2 py-1"
          placeholder="Digite o e-mail do cliente"
          {...register("email")}
        />
        {formState.errors.email && (
          <p className="text-sm text-red-400">
            {formState.errors.email.message}
          </p>
        )}
      </div>
      <div className="flex w-full flex-col gap-2">
        <label htmlFor="dataNascimento">Data de Nascimento</label>
        <input
          type="date"
          id="dataNascimento"
          className="rounded-md border border-zinc-400 px-2 py-1"
          {...register("dataNascimento")}
        />
        {formState.errors.dataNascimento && (
          <p className="text-sm text-red-400">
            {formState.errors.dataNascimento.message}
          </p>
        )}
      </div>
      <div className="flex w-full flex-col gap-2">
        <label htmlFor="">Gênero</label>
        <Controller
          control={control}
          name="genero"
          defaultValue={"masculino"}
          render={({ field }) => {
            return (
              <RadioGroup
                onValueChange={field.onChange}
                value={String(field.value)}
              >
                {genderOptions.map((item) => (
                  <RadioGroupItem key={item.value} value={item.value}>
                    <RadioGroupIndicator />
                    <span className="text-sm font-medium leading-none text-zinc-800">
                      {item.text}
                    </span>
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            );
          }}
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <label htmlFor="cep">CEP</label>
        <input
          type="text"
          id="cep"
          className="rounded-md border border-zinc-400 px-2 py-1"
          {...register("cep")}
        />
        {formState.errors.cep && (
          <p className="text-sm text-red-400">{formState.errors.cep.message}</p>
        )}
      </div>
      <div className="flex w-full flex-col gap-2">
        <label htmlFor="uf">UF</label>
        <input
          type="text"
          id="uf"
          className="rounded-md border border-zinc-400 px-2 py-1"
          {...register("uf")}
        />
        {formState.errors.uf && (
          <p className="text-sm text-red-400">{formState.errors.uf.message}</p>
        )}
      </div>
      <div className="flex w-full flex-col gap-2">
        <label htmlFor="cidade">Cidade</label>
        <input
          type="text"
          id="cidade"
          className="rounded-md border border-zinc-400 px-2 py-1"
          {...register("cidade")}
        />
        {formState.errors.cidade && (
          <p className="text-sm text-red-400">
            {formState.errors.cidade.message}
          </p>
        )}
      </div>
      <div className="flex w-full flex-col gap-2">
        <label htmlFor="bairro">Bairro</label>
        <input
          type="text"
          id="bairro"
          className="rounded-md border border-zinc-400 px-2 py-1"
          {...register("bairro")}
        />
        {formState.errors.bairro && (
          <p className="text-sm text-red-400">
            {formState.errors.bairro.message}
          </p>
        )}
      </div>
      <div className="flex w-full flex-col gap-2">
        <label htmlFor="endereco">Endereço</label>
        <input
          type="text"
          id="endereco"
          className="rounded-md border border-zinc-400 px-2 py-1"
          {...register("endereco")}
        />
        {formState.errors.endereco && (
          <p className="text-sm text-red-400">
            {formState.errors.endereco.message}
          </p>
        )}
      </div>
      <div className="flex w-full flex-col gap-2">
        <label htmlFor="complemento">Complemento</label>
        <input
          type="text"
          id="complemento"
          className="rounded-md border border-zinc-400 px-2 py-1"
          {...register("complemento")}
        />
        {formState.errors.complemento && (
          <p className="text-sm text-red-400">
            {formState.errors.complemento.message}
          </p>
        )}
      </div>
    </>
  );
}
