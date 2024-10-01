import { useQuery } from "@tanstack/react-query";
import SidebarAndHeader from "../../components/SidebarAndHeader";
import { getAllSales } from "../../api/sale";
import HeaderPage from "../../components/HeaderPage";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/convertions";

export default function Sales() {
  const { data } = useQuery({
    queryKey: ["sales"],
    queryFn: getAllSales,
    staleTime: 1000 * 60,
  });

  return (
    <SidebarAndHeader selected="Vendas">
      <main className="flex h-full flex-col">
        <HeaderPage title="Vendas" link="/vendas/novo" btnTitle="Nova Venda" />
        <section className="mx-4 flex flex-col gap-1 pb-8 md:flex-1 md:overflow-y-scroll">
          {data
            ? data.map((item) => (
                <div
                  key={item.id}
                  className="flex w-full flex-col rounded-md bg-zinc-200 px-4 py-2 md:flex-row"
                >
                  <Link
                    to={`/vendas/view/${item.id}`}
                    className="flex w-full flex-col items-start justify-between"
                  >
                    <p className="flex flex-row items-center justify-start">
                      <span className="text-lg font-medium">
                        {formatDate(item.createdAt)}
                      </span>{" "}
                      - {item.cliente.nome} - {item.formaDePagamento.descricao}
                    </p>
                    <p>
                      Produtos:{" "}
                      {item.vendasProdutos
                        .map(
                          (produto) =>
                            `(${produto.quantidade}) ${produto.produto.nome}`,
                        )
                        .join(", ")}
                    </p>
                  </Link>
                  {item.ordemServico ? (
                    <Link
                      to={`/os/view/${item.ordemServico.id}`}
                      className="flex h-24 w-full cursor-pointer flex-col items-start justify-between rounded-lg border border-zinc-400 bg-zinc-300 p-4 hover:bg-zinc-400/50 md:h-full md:w-4/12"
                    >
                      <p>Ordem de Serviço nº {item.ordemServico.id}</p>
                    </Link>
                  ) : (
                    <div className="flex h-24 w-full cursor-default flex-col items-start justify-between rounded-lg border border-zinc-300 bg-zinc-200 p-4 md:h-full md:w-4/12">
                      <p>Essa venda não possui OS</p>
                    </div>
                  )}
                </div>
              ))
            : null}
        </section>
      </main>
    </SidebarAndHeader>
  );
}
