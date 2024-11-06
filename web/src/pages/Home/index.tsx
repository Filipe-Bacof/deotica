import { useQuery } from "@tanstack/react-query";
import SidebarAndHeader from "../../components/SidebarAndHeader";
import { getCountServiceOrdersInfo } from "../../api/serviceOrder";
import { Link } from "react-router-dom";

export default function Home() {
  const {
    data: dataOS,
    isLoading: isLoadingOS,
    isError: isErrorOS,
  } = useQuery({
    queryKey: ["osInfo"],
    queryFn: getCountServiceOrdersInfo,
    staleTime: 1000 * 60,
  });

  return (
    <SidebarAndHeader selected="Início">
      <div className="m-4 flex flex-col items-center md:items-start">
        <h1 className="flex flex-col items-center pb-2 text-lg font-bold md:items-start">
          Página inicial
        </h1>
        {isLoadingOS ? (
          <p>carregando informações OS...</p>
        ) : isErrorOS ? (
          // TODO: clique aqui para buscar os dados novamente
          <p>Erro ao buscar dados de OS...</p>
        ) : (
          <Link
            className="flex w-full cursor-pointer flex-col items-center gap-2 rounded-md border border-zinc-400 bg-zinc-300 p-2 md:items-start"
            to={"/os"}
          >
            <h2 className="text-base font-semibold">
              Andamento das Ordens de Serviço
            </h2>
            <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
              <p className="flex w-full flex-col items-center justify-center rounded-md bg-orange-400 p-2 md:w-1/3">
                <span>Pendentes</span>
                <span>{dataOS?.pendente}</span>
              </p>
              <p className="flex w-full flex-col items-center justify-center rounded-md bg-blue-400 p-2 md:w-1/3">
                <span>Aguardando Retirada</span>
                <span>{dataOS?.retirada}</span>
              </p>
              <p className="flex w-full flex-col items-center justify-center rounded-md bg-emerald-400 p-2 md:w-1/3">
                <span>Concluídas esse mês</span>
                <span>{dataOS?.finalizado}</span>
              </p>
            </div>
          </Link>
        )}
      </div>
    </SidebarAndHeader>
  );
}
