import { useQuery } from "@tanstack/react-query";
import SidebarAndHeader from "../../components/SidebarAndHeader";
import { getAllServiceOrders } from "../../api/serviceOrder";
import HeaderPage from "../../components/HeaderPage";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/convertions";

export default function ServiceOrder() {
  const { data } = useQuery({
    queryKey: ["serviceOrders"],
    queryFn: getAllServiceOrders,
    staleTime: 1000 * 60,
  });

  return (
    <SidebarAndHeader selected="Ordens de Serviço">
      <main className="flex h-full flex-col">
        <HeaderPage
          title="Ordens de Serviço"
          link="/vendas"
          btnTitle="Ver Vendas"
        />
        <section className="mx-4 flex flex-col gap-1 pb-8 md:flex-1 md:overflow-y-scroll">
          {data
            ? data.map((item) => (
                <Link
                  key={item.id}
                  to={`/os/view/${item.id}`}
                  className="rounded-md bg-zinc-200 px-4 py-2"
                >
                  <div className="flex w-full flex-col items-center justify-between md:flex-row">
                    <p>{item.id}</p>
                    {item.dataDeEntrega && (
                      <p>{formatDate(item.dataDeEntrega)}</p>
                    )}
                    <p>{item.cliente.nome}</p>
                    <p>{item.concluido}</p>
                  </div>
                </Link>
              ))
            : null}
        </section>
      </main>
    </SidebarAndHeader>
  );
}
