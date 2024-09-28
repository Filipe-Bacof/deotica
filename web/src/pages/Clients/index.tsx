import { useQuery } from "@tanstack/react-query";
import SidebarAndHeader from "../../components/SidebarAndHeader";
import { getAllClients } from "../../api/client";
import { Button } from "../../components/Button";

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
          <Button asLink to="/clientes/novo">
            Novo Cliente
          </Button>
        </section>
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
