import SidebarAndHeader from "../../components/SidebarAndHeader";

export default function Home() {
  return (
    <SidebarAndHeader selected="Início">
      <h1>Página inicial</h1>
      <p>Ideias de coisas que podem ser exibidas aqui</p>
      <ul>
        <li>ultima venda</li>
        <li>3 produtos mais vendidos</li>
        <li>criar venda para o produto clicado</li>
        <li>ordens de serviço pendentes</li>
        <li>clientes com atendimento a domicilio</li>
        <li>disparo de email em massa</li>
      </ul>
    </SidebarAndHeader>
  );
}
