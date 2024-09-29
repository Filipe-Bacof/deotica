import { useQuery } from "@tanstack/react-query";
import SidebarAndHeader from "../../components/SidebarAndHeader";
import { getAllProducts } from "../../api/product";
import HeaderPage from "../../components/HeaderPage";
import { Link } from "react-router-dom";

export default function Products() {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 1000 * 60,
  });

  return (
    <SidebarAndHeader selected="Produtos">
      <main className="flex h-full flex-col">
        <HeaderPage
          title="Meus Produtos"
          link="/produtos/novo"
          btnTitle="Novo Produto"
        />
        <section className="mx-4 flex flex-col gap-1 pb-8 md:flex-1 md:overflow-y-scroll">
          {data
            ? data.map((item) => (
                <Link
                  key={item.id}
                  to={`/produtos/view/${item.id}`}
                  className="rounded-md bg-zinc-200 px-4 py-2"
                >
                  <div className="flex w-full flex-col items-center justify-between md:flex-row">
                    <p>{item.nome}</p>
                    <p>Quantidade: {item.quantidade}</p>
                  </div>
                  <div className="flex w-full flex-col items-center justify-between md:flex-row">
                    <p>Status: {item.status ? "Ativo" : "Inativo"}</p>
                    <p>Preço: R$ {item.preco}</p>
                  </div>
                </Link>
              ))
            : null}
        </section>
      </main>
    </SidebarAndHeader>
  );
}
