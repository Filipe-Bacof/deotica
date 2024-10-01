import type { SaleResponse } from "../interfaces/sale.interface";

type NfeDataProps = {
  data: SaleResponse;
};

export default function NfeData({ data }: NfeDataProps) {
  const values = data.vendasProdutos.map((produto) => {
    return Number((produto.quantidade * Number(produto.preco)).toFixed(2));
  });
  let total = 0;
  values.map((value) => {
    total = total + value;
  });
  return (
    <div className="space-y-4 p-4 font-mono text-sm">
      <div className="space-y-1">
        <div className="text-lg font-bold underline">Nota Fiscal</div>
        <div className="tracking-wide">Hash Venda: {data.id}</div>
        <div>Data de Venda: {new Date(data.createdAt).toLocaleString()}</div>
        <div>Forma de Pagamento: {data.formaDePagamento.descricao}</div>
        <div>
          Cliente: {data.cliente.nome} ({data.cliente.genero})
        </div>
      </div>

      <div className="space-y-1">
        <div className="font-semibold underline">Dados da Venda</div>
        <div>Valor de Entrada: R$ {data.valorDeEntrada}</div>
        <div>Desconto: R$ {data.desconto}</div>
        <div>Número de Parcelas: {data.numeroDeParcelas}</div>
      </div>

      {data.vendasProdutos.length > 0 && (
        <div className="space-y-1">
          <div className="font-semibold underline">Produtos</div>
          {data.vendasProdutos.map((produto) => (
            <div
              key={`${produto.vendaId}-${produto.produtoId}`}
              className="mb-2 flex w-full items-center justify-between space-y-1 border-b border-gray-300 pb-2"
            >
              <p>{produto.produto.nome}</p>
              <div className="flex flex-row gap-12">
                <p>
                  &#40;{produto.quantidade}&#41; R${" "}
                  {Number(produto.preco).toFixed(2)}
                </p>
                <p>
                  R$ {(produto.quantidade * Number(produto.preco)).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
          <div className="mb-2 flex w-full items-center justify-between space-y-1 border-b border-gray-300 pb-2">
            <p>Total</p>
            <p>R$ {total.toFixed(2)}</p>
          </div>
        </div>
      )}

      {data.ordemServico && (
        <div className="space-y-1">
          <div className="font-semibold underline">Ordem de Serviço</div>
          <div>Nº OS: {data.ordemServico.id}</div>
          <div>Tipo de Lente: {data.ordemServico.tipoLente}</div>
          <div>Tratamentos: {data.ordemServico.tratamentos}</div>
          <div>Status: {data.ordemServico.concluido}</div>
        </div>
      )}

      <div className="space-y-1">
        <h1 className="font-deotica text-xl font-extrabold uppercase">
          Deotica
        </h1>
        <p>CNPJ 29.634.330/0001-10</p>
        <p>Nome: {data.criador.nome}</p>
        <p>Email: {data.criador.email}</p>
        <p>Telefone: &#40;51&#41; 98331-3692</p>
        <p>
          Endereço: Av. Getúlio Vargas, 2451 - Centro, Esteio - RS, 93260-075
        </p>
      </div>
    </div>
  );
}
