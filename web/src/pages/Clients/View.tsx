import HeaderPage from "../../components/HeaderPage";
import SidebarAndHeader from "../../components/SidebarAndHeader";
import { useParams } from "react-router-dom";

export default function ViewClient() {
  const { id } = useParams();
  return (
    <SidebarAndHeader selected="Clientes">
      <main className="flex h-full flex-col">
        <HeaderPage
          title="Visualizar dados do cliente"
          link="/clientes"
          btnTitle="Voltar"
        />
        <section className="overflow-y-scroll pb-8">
          <p>Ver dados do cliente com o id:</p>
          <p>{id}</p>
        </section>
      </main>
    </SidebarAndHeader>
  );
}
