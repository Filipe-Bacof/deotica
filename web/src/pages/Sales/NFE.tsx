import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSaleById } from "../../api/sale";
import { getToken, isTokenValid } from "../../utils/tokenMiddleware";
import { Button } from "../../components/Button";
import NfeData from "../../components/NfeData";

export default function NFE() {
  const token = getToken();
  const validToken = isTokenValid(token);
  const { id } = useParams();
  const idSale = id || "0";
  const { data, isLoading, isError } = useQuery({
    queryKey: ["sale", idSale],
    queryFn: () => getSaleById(idSale),
    staleTime: 1000 * 60,
  });
  return validToken ? (
    isLoading ? (
      <p>Carregando...</p>
    ) : isError ? (
      <p>Erro ao localizar esta venda</p>
    ) : data ? (
      <>
        <p className="max-h-screen overflow-scroll">
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
          <NfeData data={data} />
        </p>
      </>
    ) : null
  ) : (
    <div className="flex h-screen flex-col items-center justify-center gap-6 bg-blueDeotica">
      <h1 className="font-deotica text-8xl font-extrabold uppercase">
        Deotica
      </h1>
      <p>Você precisa estar logado para ver estas informações</p>
      <Button
        className="w-fit"
        asLink
        to="/login"
        type="button"
        variant="warning"
      >
        Fazer Login
      </Button>
    </div>
  );
}
