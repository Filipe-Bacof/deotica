import { useQuery } from "@tanstack/react-query";
import { getSalesLastMonth } from "../../../api/sale";
import { formatarMoeda } from "../../../utils/calculator";
import { Link } from "react-router-dom";
import ReactApexChart from "react-apexcharts";

export default function DataAndChartSales() {
  const {
    data: dataSalesLastMonth,
    isLoading: isLoadingSalesLastMonth,
    isError: isErrorSalesLastMonth,
  } = useQuery({
    queryKey: ["salesLastMonth"],
    queryFn: getSalesLastMonth,
    staleTime: 1000 * 60,
  });

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "line" as const,
      height: 350,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories:
        dataSalesLastMonth?.data.map((sale) =>
          new Date(sale.createdAt).toLocaleDateString(),
        ) ?? [],
      title: { text: "" },
    },
    yaxis: {
      title: { text: "Valor Recebido (com desconto)" },
    },
    title: {
      text: "",
      align: "center",
    },
    tooltip: {
      enabled: true,
      x: {
        format: "dd/MM/yyyy",
      },
      y: {
        formatter: (value) => formatarMoeda(value),
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: true,
    },
  };

  const chartSeries: ApexAxisChartSeries = [
    {
      name: "Valor Recebido",
      data: dataSalesLastMonth?.data.map((sale) => sale.totalComDesconto) ?? [],
    },
  ];

  return isLoadingSalesLastMonth ? (
    <p>carregando vendas do último mês...</p>
  ) : isErrorSalesLastMonth ? (
    // TODO: clique aqui para buscar os dados novamente
    <p>Erro ao buscar vendas do último mês...</p>
  ) : (
    <>
      <Link
        className="flex w-full cursor-pointer flex-col items-center gap-2 rounded-md border border-zinc-400 bg-zinc-300 p-2 md:items-start"
        to={"/vendas"}
      >
        <h2 className="text-base font-semibold">Vendas dos Últimos 30 dias</h2>
        <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
          <p className="flex w-full flex-col items-center justify-center rounded-md bg-emerald-400 p-2 hover:bg-emerald-300 md:w-1/2">
            <span>Faturamento</span>
            <span>
              {formatarMoeda(
                dataSalesLastMonth?.totalValues.totalComDesconto || 0,
              )}
            </span>
          </p>
          <p className="flex w-full flex-col items-center justify-center rounded-md bg-emerald-400 p-2 hover:bg-emerald-300 md:w-1/2">
            <span>Total - Desconto</span>
            <span>
              {formatarMoeda(
                dataSalesLastMonth?.totalValues.totalSemDesconto || 0,
              )}{" "}
              -{" "}
              {formatarMoeda(
                dataSalesLastMonth?.totalValues.totalDescontado || 0,
              )}
            </span>
          </p>
        </div>
      </Link>
      <div className="mt-4 w-full">
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="line"
          height={350}
        />
      </div>
    </>
  );
}
