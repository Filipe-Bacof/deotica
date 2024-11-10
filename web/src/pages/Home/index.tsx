import SidebarAndHeader from "../../components/SidebarAndHeader";
import DataOS from "./components/DataOS";
import DataAndChartSales from "./components/DataAndChartSales";
import DataAndChartProducts from "./components/DataAndChatProducts";

export default function Home() {
  return (
    <SidebarAndHeader selected="Início" scroll>
      <div className="m-4 flex flex-col items-center gap-4 pb-20 md:items-start">
        <h1 className="flex flex-col items-center text-lg font-bold md:items-start">
          Página inicial
        </h1>
        <DataOS />
        <DataAndChartSales />
        <DataAndChartProducts />
      </div>
    </SidebarAndHeader>
  );
}
