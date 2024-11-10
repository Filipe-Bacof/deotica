import { useQuery } from "@tanstack/react-query";
import HeaderPage from "../../components/HeaderPage";
import SidebarAndHeader from "../../components/SidebarAndHeader";
import { useParams } from "react-router-dom";
import { getServiceOrderById } from "../../api/serviceOrder";
import { formatDate } from "../../utils/convertions";
import { Button } from "../../components/Button";
import UpdateStatusOS from "../../components/UpdateStatusOS";
import tipoLente1 from "../../assets/lentes-modelos/1.svg";
import tipoLente2 from "../../assets/lentes-modelos/2.svg";
import tipoLente3 from "../../assets/lentes-modelos/3.svg";
import tipoLente4 from "../../assets/lentes-modelos/4.svg";
import tipoLente5 from "../../assets/lentes-modelos/5.svg";
import tipoLente6 from "../../assets/lentes-modelos/6.svg";
import type { TipoDeLente } from "../../interfaces/serviceOrder.interface";
import type { ReactNode } from "react";

function handleTipoLente(tipoLente: TipoDeLente) {
  // biome-ignore lint/style/useConst: <explanation>
  let image = tipoLente1;
  tipoLente === "1" && image === tipoLente1;
  tipoLente === "2" && image === tipoLente2;
  tipoLente === "3" && image === tipoLente3;
  tipoLente === "4" && image === tipoLente4;
  tipoLente === "5" && image === tipoLente5;
  tipoLente === "6" && image === tipoLente6;

  return image;
}

export default function ViewServiceOrder() {
  const { id } = useParams();
  const idServiceOrder = Number(id) || 0;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["serviceOrder", idServiceOrder],
    queryFn: () => getServiceOrderById(idServiceOrder),
    staleTime: 1000 * 60,
  });

  function itemCard(title: string, value: string | ReactNode) {
    return (
      <div className="flex gap-2 rounded-md bg-zinc-300 px-2 py-1">
        <span className="font-semibold">{title}:</span>
        <p className="">{value}</p>
      </div>
    );
  }

  return (
    <SidebarAndHeader selected="Ordens de Serviço">
      <main className="flex h-full flex-col">
        <HeaderPage
          title="Visualizar Ordem de Serviço"
          link="/os"
          btnTitle="Voltar"
        />
        <section className="mx-4 overflow-y-scroll pb-8">
          {isLoading ? (
            <p>Carregando...</p>
          ) : isError ? (
            <p>Erro ao localizar esta Ordem de Serviço</p>
          ) : data ? (
            <>
              {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
              <div className="mb-4 flex flex-col gap-1">
                {itemCard(
                  "Cliente",
                  `${data.cliente.nome} (Gênero: ${data.cliente.genero})`,
                )}
                {itemCard("Vendedor", data.criador.nome)}
                {data.concluido && itemCard("Status da OS", data.concluido)}
                {data.dataDeEntrega &&
                  itemCard("Data de Entrega", formatDate(data.dataDeEntrega))}
                {data.olhoDireitoEsf &&
                  itemCard("Olho Direito ESF", data.olhoDireitoEsf)}
                {data.olhoDireitoCil &&
                  itemCard("Olho Direito CIL", data.olhoDireitoCil)}
                {data.olhoDireitoEixo &&
                  itemCard("Olho Direito Eixo", data.olhoDireitoEixo)}
                {data.olhoDireitoDNP &&
                  itemCard("Olho Direito DNP", data.olhoDireitoDNP)}
                {data.olhoDireitoAltura &&
                  itemCard("Olho Direito ALT", data.olhoDireitoAltura)}
                {data.olhoEsquerdoEsf &&
                  itemCard("Olho Esquerdo ESF", data.olhoEsquerdoEsf)}
                {data.olhoEsquerdoCil &&
                  itemCard("Olho Esquerdo CIL", data.olhoEsquerdoCil)}
                {data.olhoEsquerdoEixo &&
                  itemCard("Olho Esquerdo Eixo", data.olhoEsquerdoEixo)}
                {data.olhoEsquerdoDNP &&
                  itemCard("Olho Esquerdo DNP", data.olhoEsquerdoDNP)}
                {data.olhoEsquerdoAltura &&
                  itemCard("Olho Esquerdo ALT", data.olhoEsquerdoAltura)}
                {data.adicao && itemCard("Adição", data.adicao)}
                {data.modeloLente &&
                  itemCard("Modelo da Lente", data.modeloLente)}
                {data.tipoLente &&
                  itemCard(
                    "Tipo da Lente",
                    <div className="flex flex-row items-start justify-center gap-4">
                      <p>{data.tipoLente}</p>
                      <img
                        className="h-16 w-16"
                        src={handleTipoLente(data.tipoLente)}
                        alt="data.tipoLente"
                      />
                    </div>,
                  )}
                {data.corLente && itemCard("Cor da Lente", data.corLente)}
                {data.tratamentos && itemCard("Tratamentos", data.tratamentos)}
                {data.tipoArmacaoAC &&
                  itemCard(
                    "Tipo de Armação AC",
                    data.tipoArmacaoAC ? "Sim" : "Não",
                  )}
                {data.tipoArmacaoME &&
                  itemCard(
                    "Tipo de Armação ME",
                    data.tipoArmacaoME ? "Sim" : "Não",
                  )}
                {data.tipoArmacaoNY &&
                  itemCard(
                    "Tipo de Armação NY",
                    data.tipoArmacaoNY ? "Sim" : "Não",
                  )}
                {data.tipoArmacaoPA &&
                  itemCard(
                    "Tipo de Armação PA",
                    data.tipoArmacaoPA ? "Sim" : "Não",
                  )}
                {data.armacaoMD && itemCard("Armação MD", data.armacaoMD)}
                {data.armacaoTA && itemCard("Armação TA", data.armacaoTA)}
                {data.armacaoHoriz &&
                  itemCard("Armação Horiz", data.armacaoHoriz)}
                {data.armacaoPonte &&
                  itemCard("Armação Ponte", data.armacaoPonte)}
                {data.armacaoVert && itemCard("Armação Vert", data.armacaoVert)}
                {data.observacoes && itemCard("Observações", data.observacoes)}
                {itemCard("Somente Lente", data.somenteLente ? "Sim" : "Não")}
                {itemCard("VTA", data.vaiTrazerArmacao ? "Sim" : "Não")}
                {itemCard("Vendedor", data.criador.nome)}
                {itemCard("Criado em", formatDate(data.createdAt))}
                <UpdateStatusOS id={data.id} valueOS={data.concluido} />
              </div>
              <div className="flex w-full items-center justify-center gap-4">
                <Button
                  asLink
                  to={`/vendas/view/${data.vendaId}`}
                  variant="navigation"
                >
                  Ver Venda Relacionada
                </Button>
              </div>
            </>
          ) : null}
        </section>
      </main>
    </SidebarAndHeader>
  );
}
