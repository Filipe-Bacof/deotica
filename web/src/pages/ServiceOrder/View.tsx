import { useQuery } from "@tanstack/react-query";
import HeaderPage from "../../components/HeaderPage";
import SidebarAndHeader from "../../components/SidebarAndHeader";
import { useParams } from "react-router-dom";
import { getServiceOrderById } from "../../api/serviceOrder";
import { formatDate } from "../../utils/convertions";
import { Button } from "../../components/Button";

export default function ViewServiceOrder() {
  const { id } = useParams();
  const idServiceOrder = Number(id) || 0;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["serviceOrder", idServiceOrder],
    queryFn: () => getServiceOrderById(idServiceOrder),
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
    <SidebarAndHeader selected="Ordens de Serviço">
      <main className="flex h-full flex-col">
        <HeaderPage
          title="Visualizar Ordem de Serviço"
          link="/os"
          btnTitle="Voltar"
        />
        <section className="mx-4 overflow-y-scroll pb-8">
          {isLoading ? (
            <p>Carregando...</p>
          ) : isError ? (
            <p>Erro ao localizar esta Ordem de Serviço</p>
          ) : data ? (
            <>
              {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
              <div className="mb-4 flex flex-col gap-1">
                {itemCard("Data", `${formatDate(data.createdAt)}`)}
                {itemCard(
                  "Cliente",
                  `${data.cliente.nome} (Gênero: ${data.cliente.genero})`,
                )}
                {itemCard("Vendedor", data.criador.nome)}
              </div>
              <div className="flex w-full items-center justify-center gap-4">
                <Button
                  asLink
                  to={`/vendas/view/${data.vendaId}`}
                  variant="navigation"
                >
                  Ver Venda Relacionada
                </Button>
              </div>
            </>
          ) : null}
        </section>
      </main>
    </SidebarAndHeader>
  );
}
