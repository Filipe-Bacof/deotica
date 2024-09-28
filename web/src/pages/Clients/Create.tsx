import SidebarAndHeader from "../../components/SidebarAndHeader";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerClient } from "../../api/client";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "../../components/RadioGroup";
import { toast } from "react-toastify";

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

export default function CreateClient() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { register, control, handleSubmit, formState, reset } =
    useForm<CreateClientForm>({
      resolver: zodResolver(createClientForm),
    });

  async function handleCreateClient(data: CreateClientForm) {
    // console.log(data);
    await registerClient(data)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["clients"] });
        reset();
        navigate("/clientes");
      })
      .catch((error) => {
        // console.log(error);
        error.response.data.map((error: string) => {
          toast.error(error);
        });
      });
  }

  return (
    <SidebarAndHeader selected="Clientes">
      <main className="flex h-full flex-col">
        <section className="m-4 flex flex-col items-center justify-between md:flex-row">
          <h2 className="text-xl font-semibold">Criar novo cliente</h2>
          <Button asLink to="/clientes">
            Voltar
          </Button>
        </section>
        <section className="overflow-y-scroll pb-8">
          <form
            onSubmit={handleSubmit(handleCreateClient)}
            action=""
            className="mx-4 flex flex-1 flex-col justify-between gap-2"
          >
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
                <p className="text-sm text-red-400">
                  {formState.errors.cpf.message}
                </p>
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
                type="text"
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
                <p className="text-sm text-red-400">
                  {formState.errors.cep.message}
                </p>
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
                <p className="text-sm text-red-400">
                  {formState.errors.uf.message}
                </p>
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
            <div className="flex w-full items-center justify-center">
              <Button variant="creation">Salvar</Button>
            </div>
          </form>
        </section>
      </main>
    </SidebarAndHeader>
  );
}
