import { useQuery } from "@tanstack/react-query";
import HeaderPage from "../../components/HeaderPage";
import SidebarAndHeader from "../../components/SidebarAndHeader";
import { useParams } from "react-router-dom";
import { getClientById } from "../../api/client";
import { Button } from "../../components/Button";

export default function ViewClient() {
  const { id } = useParams();
  const idClient = id || "0";
  const { data, isLoading, isError } = useQuery({
    queryKey: ["client", idClient],
    queryFn: () => getClientById(idClient),
    staleTime: 1000 * 60,
  });

  return (
    <SidebarAndHeader selected="Clientes">
      <main className="flex h-full flex-col">
        <HeaderPage
          title="Visualizar dados do cliente"
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
              <pre>{JSON.stringify(data, null, 2)}</pre>
              <div className="flex w-full items-center justify-center">
                <Button
                  asLink
                  to={`/clientes/edit/${data.id}`}
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
