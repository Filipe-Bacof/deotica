import { useQuery } from "@tanstack/react-query";
import SidebarAndHeader from "../../components/SidebarAndHeader";
import { getAllPromoEmails } from "../../api/promoEmail";
import HeaderPage from "../../components/HeaderPage";

export default function Mail() {
  const { data } = useQuery({
    queryKey: ["emails"],
    queryFn: getAllPromoEmails,
    staleTime: 1000 * 60,
  });

  return (
    <SidebarAndHeader selected="Email Promocional">
      <main className="flex h-full flex-col">
        <HeaderPage
          title="Meus clientes"
          link="/clientes/novo"
          btnTitle="Novo Cliente"
        />
        <section className="mx-4 flex flex-col gap-1 pb-8 md:flex-1 md:overflow-y-scroll">
          {data
            ? data.map((item) => (
                <div
                  key={item.id}
                  className="flex w-full flex-col items-center justify-between md:flex-row"
                >
                  <input type="checkbox" disabled={!item.ativo} />
                  <p className={`w-5/12 ${!item.ativo && "text-red-500"}`}>
                    {item.nome}
                  </p>
                  <p className={`w-5/12 ${!item.ativo && "text-red-500"}`}>
                    {item.email}
                  </p>
                </div>
              ))
            : null}
        </section>
      </main>
    </SidebarAndHeader>
  );
}
