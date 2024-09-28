import { useQuery } from "@tanstack/react-query";
import SidebarAndHeader from "../../components/SidebarAndHeader";
import { getAllClients } from "../../api/client";

export default function Clients() {
  const { data } = useQuery({
    queryKey: ["clients"],
    queryFn: getAllClients,
    staleTime: 1000 * 60 * 10, // 10 minutos
  });

  return (
    <SidebarAndHeader selected="Clientes">
      <main className="flex h-full flex-col">
        <section className="m-4 flex flex-col items-center justify-between md:flex-row">
          <h2 className="text-xl font-semibold">Meus clientes</h2>
          <button type="button" className="">
            Novo Cliente
          </button>
        </section>
        <section>
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
