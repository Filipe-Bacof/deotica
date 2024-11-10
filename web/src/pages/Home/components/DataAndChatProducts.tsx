import { useQuery } from "@tanstack/react-query";
import { getProductsWithLowStock } from "../../../api/product";
import { Link } from "react-router-dom";
import ReactApexChart from "react-apexcharts";

export default function DataAndChartProducts() {
  const {
    data: dataProductsLowStock,
    isLoading: isLoadingProductsLowStock,
    isError: isErrorProductsLowStock,
  } = useQuery({
    queryKey: ["productsLowStock"],
    queryFn: getProductsWithLowStock,
    staleTime: 1000 * 60,
  });

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "bar" as const,
      height: 350,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: "top",
        },
      },
    },
    xaxis: {
      categories:
        dataProductsLowStock?.data.map((product) => product.nome) ?? [],
      title: { text: "Quantidade em Estoque" },
    },
    yaxis: {
      title: { text: "Produtos" },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => val.toString(),
      offsetX: -16,
      style: { fontSize: "12px", colors: ["#fff"] },
    },
    grid: {
      show: true,
    },
  };

  const chartSeries = [
    {
      name: "Estoque",
      data:
        dataProductsLowStock?.data.map((product) => product.quantidade) ?? [],
    },
  ];

  return isLoadingProductsLowStock ? (
    <p>carregando vendas do último mês...</p>
  ) : isErrorProductsLowStock ? (
    // TODO: clique aqui para buscar os dados novamente
    <p>Erro ao buscar vendas do último mês...</p>
  ) : (
    <>
      <Link
        className="flex w-full cursor-pointer flex-col items-center gap-2 rounded-md border border-zinc-400 bg-zinc-300 p-2 md:items-start"
        to={"/produtos"}
      >
        <h2 className="text-base font-semibold">Produtos com estoque baixo</h2>
        <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
          <p className="flex w-full flex-col items-center justify-center rounded-md bg-emerald-400 p-2 hover:bg-emerald-300 md:w-1/2">
            <span>Qtd Produtos Cadastrados</span>
            <span>{dataProductsLowStock?.totalValues.total}</span>
          </p>
          <p className="flex w-full flex-col items-center justify-center rounded-md bg-emerald-400 p-2 hover:bg-emerald-300 md:w-1/2">
            <span>Itens com estoque abaixo de 30</span>
            <span>{dataProductsLowStock?.totalValues.lowStock}</span>
          </p>
        </div>
      </Link>
      <div className="mt-4 w-full">
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={350}
        />
      </div>
    </>
  );
}
