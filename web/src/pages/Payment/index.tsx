import { useQuery } from "@tanstack/react-query";
import SidebarAndHeader from "../../components/SidebarAndHeader";
import { getAllPaymentMethods } from "../../api/payment";
import HeaderPage from "../../components/HeaderPage";
import { Link } from "react-router-dom";

export default function PaymentMethods() {
  const { data } = useQuery({
    queryKey: ["paymentMethods"],
    queryFn: getAllPaymentMethods,
    staleTime: 1000 * 60,
  });

  return (
    <SidebarAndHeader selected="Formas de Pagamento">
      <main className="flex h-full flex-col">
        <HeaderPage
          title="Formas de Pagamento"
          link="/forma-de-pagamento/novo"
          btnTitle="Nova Forma de Pagamento"
        />
        <section className="mx-4 flex flex-col gap-1 pb-8 md:flex-1 md:overflow-y-scroll">
          {data
            ? data.map((item) => (
                <Link
                  key={item.id}
                  to={`/forma-de-pagamento/view/${item.id}`}
                  className="rounded-md bg-zinc-200 px-4 py-2"
                >
                  <div className="flex w-full flex-col items-center justify-between md:flex-row">
                    <p>{item.descricao}</p>
                  </div>
                </Link>
              ))
            : null}
        </section>
      </main>
    </SidebarAndHeader>
  );
}
