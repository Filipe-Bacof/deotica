import { useQuery } from "@tanstack/react-query";
import HeaderPage from "../../components/HeaderPage";
import SidebarAndHeader from "../../components/SidebarAndHeader";
import { useParams } from "react-router-dom";
import { getSaleById } from "../../api/sale";
import { formatDate } from "../../utils/convertions";
import { Button } from "../../components/Button";
import { Copy } from "lucide-react";
import { toast } from "react-toastify";

export default function ViewSale() {
  const { id } = useParams();
  const idSale = id || "0";
  const { data, isLoading, isError } = useQuery({
    queryKey: ["sale", idSale],
    queryFn: () => getSaleById(idSale),
    staleTime: 1000 * 60,
  });

  function itemCard(title: string, value: string) {
    return (
      <div className="flex gap-2 rounded-md bg-zinc-300 px-2 py-1">
        <span className="font-semibold">{title}:</span>
        <p className="">{value}</p>
      </div>
    );
  }

  const text = `${import.meta.env.VITE_FRONTEND_URL}/nfe/${idSale}`;

  function copyToClipboard() {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Link da NFE copiado para área de transferência!");
      },
      (err) => {
        console.error(err);
        toast.error("Falha ao copiar o texto!");
      },
    );
  }

  return (
    <SidebarAndHeader selected="Vendas">
      <main className="flex h-full flex-col">
        <HeaderPage title="Visualizar Venda" link="/vendas" btnTitle="Voltar" />
        <section className="mx-4 overflow-y-scroll pb-8">
          {isLoading ? (
            <p>Carregando...</p>
          ) : isError ? (
            <p>Erro ao localizar esta venda</p>
          ) : data ? (
            <>
              {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
              <div className="mb-4 flex flex-col gap-1">
                {itemCard("Data", `${formatDate(data.createdAt)}`)}
                {itemCard(
                  "Cliente",
                  `${data.cliente.nome} (Gênero: ${data.cliente.genero})`,
                )}
                {itemCard("Vendedor", data.criador.nome)}
                {itemCard(
                  "Ordem de Serviço",
                  data.ordemServico
                    ? `OS ${data.ordemServico.id} - Status: ${data.ordemServico.concluido}`
                    : "Sem OS!!",
                )}
                {itemCard("Nº de Parcelas", `${data.numeroDeParcelas || 0}`)}
                {itemCard("Valor de Entrada", `${data.valorDeEntrada}`)}
                {itemCard("Desconto", `${data.desconto}`)}
                {itemCard(
                  "Forma de Pagamento",
                  `${data.formaDePagamento.descricao}`,
                )}
                <div className="flex gap-2 rounded-md bg-zinc-300 px-2 py-1">
                  <p className="font-semibold">Produtos</p>
                  {data.vendasProdutos.map((produto) => (
                    <div
                      key={`${produto.produtoId}-${produto.vendaId}`}
                      className=""
                    >
                      <p>{produto.produto.nome}</p>
                      <p>Quantidade: {produto.quantidade}</p>
                      <p>Preço: {produto.preco}</p>
                      <p>Total: {produto.quantidade * Number(produto.preco)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex w-full items-center justify-center gap-4">
                {data.ordemServico && (
                  <Button
                    asLink
                    to={`/os/view/${data.ordemServico.id}`}
                    variant="navigation"
                  >
                    Ver OS relacionada
                  </Button>
                )}
                <Button
                  type="button"
                  asLink
                  to={`/nfe/${idSale}`}
                  target="_blank"
                  variant="navigation"
                >
                  Ver nota fiscal
                </Button>
                <Button onClick={() => copyToClipboard()} variant="navigation">
                  <Copy />
                </Button>
              </div>
              <p className="mt-2 text-center text-sm">
                É necessário estar logado para visualizar a NFE
              </p>
            </>
          ) : null}
        </section>
      </main>
    </SidebarAndHeader>
  );
}
