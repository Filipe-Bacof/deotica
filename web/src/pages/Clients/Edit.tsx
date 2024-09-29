import { useQuery, useQueryClient } from "@tanstack/react-query";
import HeaderPage from "../../components/HeaderPage";
import SidebarAndHeader from "../../components/SidebarAndHeader";
import { useNavigate, useParams } from "react-router-dom";
import { editClient, getClientById } from "../../api/client";
import { Button } from "../../components/Button";
import { createClientForm, type CreateClientForm } from "./Zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ClientInputs from "../../components/input-forms/ClientInputs";
import { useEffect } from "react";

export default function EditClient() {
  const { id } = useParams();
  const idClient = id || "0";
  const { data, isLoading, isError } = useQuery({
    queryKey: ["client", idClient],
    queryFn: () => getClientById(idClient),
    staleTime: 1000 * 60,
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { register, control, handleSubmit, formState, reset, setValue } =
    useForm<CreateClientForm>({
      resolver: zodResolver(createClientForm),
    });

  useEffect(() => {
    if (data) {
      setValue("nome", data.nome);
      setValue("cpf", data.cpf);
      setValue("telefone", data.telefone);
      data.email && setValue("email", data.email);
      data.dataNascimento &&
        setValue(
          "dataNascimento",
          // @ts-ignore Esse erro não faz sentido, pois é uma string com o objeto de data, está funcionando perfeitamente
          new Date(data.dataNascimento).toISOString().substring(0, 10),
        );
      data.genero && setValue("genero", data.genero);
      data.cep && setValue("cep", data.cep);
      data.uf && setValue("uf", data.uf);
      data.cidade && setValue("cidade", data.cidade);
      data.bairro && setValue("bairro", data.bairro);
      data.endereco && setValue("endereco", data.endereco);
      data.complemento && setValue("complemento", data.complemento);
    }
  }, [data, setValue]);

  async function handleUpdateClient(data: CreateClientForm) {
    // console.log(data);
    await editClient(idClient, data)
      .then((data) => {
        queryClient.invalidateQueries({ queryKey: ["clients"] });
        queryClient.invalidateQueries({ queryKey: ["client"] });
        toast.success(
          `Cliente ${data.nome.split(" ")[0]} atualizado com sucesso!`,
        );
        reset();
        navigate(`/clientes/view/${idClient}`);
      })
      .catch((error) => {
        console.log(error);
        // error.response.data.map((error: string) => {
        //   toast.error(error);
        // });
      });
  }

  return (
    <SidebarAndHeader selected="Clientes">
      <main className="flex h-full flex-col">
        <HeaderPage
          title="Editar dados do cliente"
          link="/clientes"
          btnTitle="Voltar"
        />
        <section className="mx-4 overflow-y-scroll pb-8">
          {isLoading ? (
            <p>Carregando...</p>
          ) : isError ? (
            <p>Erro ao localizar este cliente</p>
          ) : data ? (
            <>
              <form
                onSubmit={handleSubmit(handleUpdateClient)}
                action=""
                className="mx-4 flex flex-1 flex-col justify-between gap-2"
              >
                <ClientInputs
                  control={control}
                  formState={formState}
                  register={register}
                />
                <div className="flex w-full items-center justify-center gap-4">
                  <Button
                    type="button"
                    asLink
                    to={`/clientes/view/${idClient}`}
                    variant="navigation"
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" variant="warning">
                    Atualizar
                  </Button>
                </div>
              </form>
            </>
          ) : null}
        </section>
      </main>
    </SidebarAndHeader>
  );
}
