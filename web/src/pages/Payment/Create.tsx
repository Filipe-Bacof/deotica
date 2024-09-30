import SidebarAndHeader from "../../components/SidebarAndHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerPaymentMethod } from "../../api/payment";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { toast } from "react-toastify";
import HeaderPage from "../../components/HeaderPage";
import { createPaymentForm, type CreatePaymentForm } from "./Zod";
import PaymentInputs from "../../components/input-forms/PaymentInputs";

export default function CreatePaymentMethod() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { register, handleSubmit, formState, reset } =
    useForm<CreatePaymentForm>({
      resolver: zodResolver(createPaymentForm),
    });

  async function handleCreatePaymentMethod(data: CreatePaymentForm) {
    // console.log(data);
    await registerPaymentMethod(data)
      .then((data) => {
        queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
        toast.success(
          `Forma de Pagamento ${data.descricao} cadastrada com sucesso!`,
        );
        reset();
        navigate("/forma-de-pagamento");
      })
      .catch((error) => {
        // console.log(error);
        error.response.data.map((error: string) => {
          toast.error(error);
        });
      });
  }

  return (
    <SidebarAndHeader selected="Formas de Pagamento">
      <main className="flex h-full flex-col">
        <HeaderPage
          title="Criar nova Forma de Pagamento"
          link="/forma-de-pagamento"
          btnTitle="Voltar"
        />
        <section className="overflow-y-scroll pb-8">
          <form
            onSubmit={handleSubmit(handleCreatePaymentMethod)}
            action=""
            className="mx-4 flex flex-1 flex-col justify-between gap-2"
          >
            <PaymentInputs formState={formState} register={register} />
            <div className="flex w-full items-center justify-center">
              <Button variant="creation">Salvar</Button>
            </div>
          </form>
        </section>
      </main>
    </SidebarAndHeader>
  );
}
