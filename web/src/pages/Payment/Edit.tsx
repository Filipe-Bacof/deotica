import { useQuery, useQueryClient } from "@tanstack/react-query";
import HeaderPage from "../../components/HeaderPage";
import SidebarAndHeader from "../../components/SidebarAndHeader";
import { useNavigate, useParams } from "react-router-dom";
import { editPaymentMethod, getOnePaymentMethod } from "../../api/payment";
import { Button } from "../../components/Button";
import { createPaymentForm, type CreatePaymentForm } from "./Zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import PaymentInputs from "../../components/input-forms/PaymentInputs";
import { useEffect } from "react";

export default function EditPaymentMethod() {
  const { id } = useParams();
  const idPayment = Number(id) || 0;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["paymentMethod", idPayment],
    queryFn: () => getOnePaymentMethod(idPayment),
    staleTime: 1000 * 60,
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { register, handleSubmit, formState, reset, setValue } =
    useForm<CreatePaymentForm>({
      resolver: zodResolver(createPaymentForm),
    });

  useEffect(() => {
    if (data) {
      setValue("descricao", data.descricao);
    }
  }, [data, setValue]);

  async function handleUpdatePaymentMethod(data: CreatePaymentForm) {
    // console.log(data);
    await editPaymentMethod(idPayment, data)
      .then((data) => {
        queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
        queryClient.invalidateQueries({ queryKey: ["paymentMethod"] });
        toast.success(
          `Forma de Pagamento ${data.descricao} atualizada com sucesso!`,
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
          title="Editar dados da Forma de Pagamento"
          link="/forma-de-pagamento"
          btnTitle="Voltar"
        />
        <section className="mx-4 overflow-y-scroll pb-8">
          {isLoading ? (
            <p>Carregando...</p>
          ) : isError ? (
            <p>Erro ao localizar esta forma de pagamento</p>
          ) : data ? (
            <>
              <form
                onSubmit={handleSubmit(handleUpdatePaymentMethod)}
                action=""
                className="mx-4 flex flex-1 flex-col justify-between gap-2"
              >
                <PaymentInputs formState={formState} register={register} />
                <div className="flex w-full items-center justify-center gap-4">
                  <Button
                    type="button"
                    asLink
                    to={`/forma-de-pagamento/view/${idPayment}`}
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
