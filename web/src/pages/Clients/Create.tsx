import SidebarAndHeader from "../../components/SidebarAndHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerClient } from "../../api/client";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { toast } from "react-toastify";
import HeaderPage from "../../components/HeaderPage";
import { createClientForm, type CreateClientForm } from "./Zod";
import ClientInputs from "../../components/input-forms/ClientInputs";

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
      .then((data) => {
        queryClient.invalidateQueries({ queryKey: ["clients"] });
        toast.success(
          `Cliente ${data.nome.split(" ")[0]} cadastrado com sucesso!`,
        );
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
        <HeaderPage
          title="Criar novo cliente"
          link="/clientes"
          btnTitle="Voltar"
        />
        <section className="overflow-y-scroll pb-8">
          <form
            onSubmit={handleSubmit(handleCreateClient)}
            action=""
            className="mx-4 flex flex-1 flex-col justify-between gap-2"
          >
            <ClientInputs
              control={control}
              formState={formState}
              register={register}
            />
            <div className="flex w-full items-center justify-center">
              <Button variant="creation">Salvar</Button>
            </div>
          </form>
        </section>
      </main>
    </SidebarAndHeader>
  );
}
