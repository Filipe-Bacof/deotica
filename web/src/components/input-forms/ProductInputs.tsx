import {
  type Control,
  Controller,
  type FormState,
  type UseFormRegister,
} from "react-hook-form";
import {
  genderOptions,
  type CreateProductForm,
} from "../../pages/Products/Zod";
import { RadioGroup, RadioGroupIndicator, RadioGroupItem } from "../RadioGroup";

type ProductInputsProps = {
  register: UseFormRegister<CreateProductForm>;
  formState: FormState<CreateProductForm>;
  control: Control<CreateProductForm>;
};

export default function ProductInputs({
  register,
  formState,
  control,
}: ProductInputsProps) {
  return (
    <>
      <div className="flex w-full flex-col gap-2">
        <label htmlFor="nome">Nome*</label>
        <input
          type="text"
          id="nome"
          required
          className="rounded-md border border-zinc-400 px-2 py-1"
          placeholder="Digite o nome do produto"
          {...register("nome")}
        />
        {formState.errors.nome && (
          <p className="text-sm text-red-400">
            {formState.errors.nome.message}
          </p>
        )}
      </div>
      <div className="flex w-full flex-col gap-2">
        <label htmlFor="quantidade">Quantidade*</label>
        <input
          type="number"
          id="quantidade"
          required
          className="rounded-md border border-zinc-400 px-2 py-1"
          placeholder="Digite a quantidade do produto"
          {...register("quantidade")}
        />
        {formState.errors.quantidade && (
          <p className="text-sm text-red-400">
            {formState.errors.quantidade.message}
          </p>
        )}
      </div>
      <div className="flex w-full flex-col gap-2">
        <label htmlFor="preco">Preço*</label>
        <input
          type="text"
          id="preco"
          required
          className="rounded-md border border-zinc-400 px-2 py-1"
          placeholder="Digite o preço do produto'"
          {...register("preco")}
        />
        {formState.errors.preco && (
          <p className="text-sm text-red-400">
            {formState.errors.preco.message}
          </p>
        )}
      </div>
      <div className="flex w-full flex-col gap-2">
        <label htmlFor="status">Status*</label>
        <input
          type="checkbox"
          id="status"
          required
          defaultChecked={true}
          className="rounded-md border border-zinc-400 px-2 py-1"
          placeholder="Status do produto"
          {...register("status")}
        />
        {formState.errors.status && (
          <p className="text-sm text-red-400">
            {formState.errors.status.message}
          </p>
        )}
      </div>
      <div className="flex w-full flex-col gap-2">
        <label htmlFor="codigoDeBarras">Código de Barras</label>
        <input
          type="text"
          id="codigoDeBarras"
          className="rounded-md border border-zinc-400 px-2 py-1"
          placeholder="Digite o código de barras do produto'"
          {...register("codigoDeBarras")}
        />
        {formState.errors.codigoDeBarras && (
          <p className="text-sm text-red-400">
            {formState.errors.codigoDeBarras.message}
          </p>
        )}
      </div>
      <div className="flex w-full flex-col gap-2">
        <label htmlFor="marca">Marca</label>
        <input
          type="text"
          id="marca"
          className="rounded-md border border-zinc-400 px-2 py-1"
          placeholder="Digite a marca do produto'"
          {...register("marca")}
        />
        {formState.errors.marca && (
          <p className="text-sm text-red-400">
            {formState.errors.marca.message}
          </p>
        )}
      </div>
      <div className="flex w-full flex-col gap-2">
        <label htmlFor="modelo">Modelo</label>
        <input
          type="text"
          id="modelo"
          className="rounded-md border border-zinc-400 px-2 py-1"
          placeholder="Digite o modelo do produto'"
          {...register("modelo")}
        />
        {formState.errors.modelo && (
          <p className="text-sm text-red-400">
            {formState.errors.modelo.message}
          </p>
        )}
      </div>
      <div className="flex w-full flex-col gap-2">
        <label htmlFor="tipo">Tipo</label>
        <input
          type="text"
          id="tipo"
          className="rounded-md border border-zinc-400 px-2 py-1"
          placeholder="Digite o tipo do produto'"
          {...register("tipo")}
        />
        {formState.errors.tipo && (
          <p className="text-sm text-red-400">
            {formState.errors.tipo.message}
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
        <label htmlFor="produtoAtivo">Produto Ativo Descrição</label>
        <input
          type="text"
          id="produtoAtivo"
          placeholder="Digite a descrição do produto Ativo"
          className="rounded-md border border-zinc-400 px-2 py-1"
          {...register("produtoAtivo")}
        />
        {formState.errors.produtoAtivo && (
          <p className="text-sm text-red-400">
            {formState.errors.produtoAtivo.message}
          </p>
        )}
      </div>
    </>
  );
}
