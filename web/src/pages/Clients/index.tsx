import { useQuery } from "@tanstack/react-query";
import SidebarAndHeader from "../../components/SidebarAndHeader";
import { getAllClients } from "../../api/client";
import HeaderPage from "../../components/HeaderPage";
import { Link } from "react-router-dom";

export default function Clients() {
  const { data } = useQuery({
    queryKey: ["clients"],
    queryFn: getAllClients,
    staleTime: 1000 * 60,
  });

  return (
    <SidebarAndHeader selected="Clientes">
      <main className="flex h-full flex-col">
        <HeaderPage
          title="Meus clientes"
          link="/clientes/novo"
          btnTitle="Novo Cliente"
        />
        <section className="mx-4 flex flex-col gap-1 pb-8 md:flex-1 md:overflow-y-scroll">
          {data
            ? data.map((item) => (
                <Link
                  key={item.id}
                  to={`/clientes/view/${item.id}`}
                  className="rounded-md bg-zinc-400 px-4 py-2"
                >
                  <div className="flex w-full flex-col items-center justify-between md:flex-row">
                    <p>{item.nome}</p>
                    <p>{item.cpf}</p>
                  </div>
                  <div className="flex w-full flex-col items-center justify-between md:flex-row">
                    <p>{item.telefone}</p>
                    <p>{item.email}</p>
                  </div>
                </Link>
              ))
            : null}
        </section>
      </main>
    </SidebarAndHeader>
  );
}
