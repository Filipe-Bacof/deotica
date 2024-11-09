function calcularValorComDesconto(valor: string, desconto: string): number {
  const valorFloat = Number.parseFloat(valor.replace(",", "."));
  const descontoFloat = Number.parseFloat(desconto.replace(",", "."));

  return valorFloat - descontoFloat;
}

function formatarMoeda(valor: number) {
  const numero = Number.parseFloat(valor.toString().replace(",", "."));

  return numero.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export { calcularValorComDesconto, formatarMoeda };
