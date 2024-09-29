import { useQuery } from "@tanstack/react-query";
import HeaderPage from "../../components/HeaderPage";
import SidebarAndHeader from "../../components/SidebarAndHeader";
import { useParams } from "react-router-dom";
import { getProductById } from "../../api/product";
import { Button } from "../../components/Button";

export default function ViewProduct() {
  const { id } = useParams();
  const idProduct = id || "0";
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", idProduct],
    queryFn: () => getProductById(idProduct),
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

  return (
    <SidebarAndHeader selected="Produtos">
      <main className="flex h-full flex-col">
        <HeaderPage
          title="Visualizar dados do produto"
          link="/produtos"
          btnTitle="Voltar"
        />
        <section className="mx-4 overflow-y-scroll pb-8">
          {isLoading ? (
            <p>Carregando...</p>
          ) : isError ? (
            <p>Erro ao localizar este produto</p>
          ) : data ? (
            <>
              {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
              <div className="mb-4 flex flex-col gap-1">
                {itemCard("Nome", data.nome)}
                {itemCard("Quantidade", String(data.quantidade))}
                {itemCard("Preço", `R$ ${data.preco}`)}
                {itemCard("Status", data.status ? "Ativo" : "Inativo")}
                {itemCard("Código de Barras", data.codigoDeBarras || "")}
                {itemCard("Marca", data.marca || "")}
                {itemCard("Modelo", data.modelo || "")}
                {itemCard("Tipo", data.tipo || "")}
                {itemCard("Gênero", data.genero)}
                {itemCard("Produto Ativo", data.produtoAtivo || "")}
                {itemCard("Criado por", data.criador.nome)}
              </div>
              <div className="flex w-full items-center justify-center">
                <Button
                  asLink
                  to={`/produtos/edit/${data.id}`}
                  variant="warning"
                >
                  Editar
                </Button>
              </div>
            </>
          ) : null}
        </section>
      </main>
    </SidebarAndHeader>
  );
}
