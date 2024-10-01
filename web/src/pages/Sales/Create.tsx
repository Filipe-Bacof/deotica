import HeaderPage from "../../components/HeaderPage";
import SidebarAndHeader from "../../components/SidebarAndHeader";

export default function CreateSale() {
  return (
    <SidebarAndHeader selected="Vendas">
      <main className="flex h-full flex-col">
        <HeaderPage title="Nova Venda" link="/vendas" btnTitle="Voltar" />
        <section className="overflow-y-scroll pb-8">
          <div className="mx-4 flex flex-1 flex-col justify-between gap-2">
            <p>Essa tela ainda não foi criada kkk</p>
            <p>
              Essa tela vai ser difícil e bem complexa, vai ficar pra amanhã kkk
            </p>
          </div>
        </section>
      </main>
    </SidebarAndHeader>
  );
}
