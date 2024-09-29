import HeaderPage from "../../components/HeaderPage";
import SidebarAndHeader from "../../components/SidebarAndHeader";

export default function EditClient() {
  return (
    <SidebarAndHeader selected="Clientes">
      <main className="flex h-full flex-col">
        <HeaderPage
          title="Editar dados do cliente"
          link="/clientes"
          btnTitle="Voltar"
        />
        <section className="overflow-y-scroll pb-8">dados</section>
      </main>
    </SidebarAndHeader>
  );
}
