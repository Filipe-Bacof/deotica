import { useQuery } from "@tanstack/react-query";
import HeaderPage from "../../components/HeaderPage";
import SidebarAndHeader from "../../components/SidebarAndHeader";
import { useParams } from "react-router-dom";
import { getOnePaymentMethod } from "../../api/payment";
import { Button } from "../../components/Button";

export default function ViewPaymentMethod() {
  const { id } = useParams();
  const idPayment = Number(id) || 0;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["paymentMethod", idPayment],
    queryFn: () => getOnePaymentMethod(idPayment),
    staleTime: 1000 * 60,
  });

  function itemCard(title: string, value: string) {
    return (
      <div className="flex gap-2 rounded-md bg-zinc-300 px-2 py-1">
        <span className="font-semibold">{title}:</span>
        <p className="">{value}</p>
      </div>
    );
  }

  return (
    <SidebarAndHeader selected="Formas de Pagamento">
      <main className="flex h-full flex-col">
        <HeaderPage
          title="Visualizar Forma de Pagamento"
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
              {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
              <div className="mb-4 flex flex-col gap-1">
                {itemCard("Descrição", data.descricao)}
              </div>
              <div className="flex w-full items-center justify-center">
                <Button
                  asLink
                  to={`/forma-de-pagamento/edit/${data.id}`}
                  variant="warning"
                >
                  Editar
                </Button>
              </div>
            </>
          ) : null}
        </section>
      </main>
    </SidebarAndHeader>
  );
}
