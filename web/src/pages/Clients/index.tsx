import { useQuery } from "@tanstack/react-query";
import SidebarAndHeader from "../../components/SidebarAndHeader";
import { getAllClients } from "../../api/client";
import HeaderPage from "../../components/HeaderPage";

export default function Clients() {
  const { data } = useQuery({
    queryKey: ["clients"],
    queryFn: getAllClients,
    staleTime: 1000 * 60 * 10, // 10 minutos
  });

  return (
    <SidebarAndHeader selected="Clientes">
      <main className="flex h-full flex-col">
        <HeaderPage title="Meus clientes" link="/clientes/novo" />
        <section className="mx-4 flex flex-col">
          {data
            ? data.map((item) => (
                <div key={item.id}>
                  <p>{item.nome}</p>
                </div>
              ))
            : null}
        </section>
      </main>
    </SidebarAndHeader>
  );
}
