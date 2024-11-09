import type { CriarVendaRequest } from "../interfaces/sale.interface";
import saleRepository from "../repositories/sale.repository";
import { isUUID } from "../utils/validations";
import salesProductsService from "./salesProducts.service";
import productService from "./product.service";
import serviceOrderService from "./serviceOrder.service";

async function getAll() {
  const result = await saleRepository.getAll();
  return result;
}

async function salesLastMonth() {
  const data = await saleRepository.salesLast30DaysData();

  const hoje = new Date();
  const trintaDiasAtras = new Date();
  trintaDiasAtras.setDate(hoje.getDate() - 30);

  const vendasPorDia = new Map();

  // biome-ignore lint/complexity/noForEach: <explanation>
  data.forEach((item) => {
    const dataVenda = new Date(item.createdAt);
    const dia = `${dataVenda.getFullYear()}-${(dataVenda.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${dataVenda.getDate().toString().padStart(2, "0")}`;

    if (!vendasPorDia.has(dia)) {
      vendasPorDia.set(dia, {
        vendasNesseDia: 0,
        totalSemDesconto: 0,
        totalDescontado: 0,
        totalComDesconto: 0,
      });
    }
    const venda = vendasPorDia.get(dia);
    venda.vendasNesseDia += 1;
    venda.totalSemDesconto += Number(item.valorDeEntrada);
    venda.totalDescontado += Number(item.desconto);
    venda.totalComDesconto = venda.totalSemDesconto - venda.totalDescontado;
  });

  const vendasCompletas = [];
  for (
    let diaAtual = new Date(trintaDiasAtras);
    diaAtual <= hoje;
    diaAtual.setDate(diaAtual.getDate() + 1)
  ) {
    const diaFormatado = `${diaAtual.getFullYear()}-${(diaAtual.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${diaAtual.getDate().toString().padStart(2, "0")}`;

    const createdAt = new Date(`${diaFormatado}T00:00:00.000Z`);

    vendasCompletas.push({
      createdAt: createdAt.toISOString(),
      vendasNesseDia: vendasPorDia.has(diaFormatado)
        ? vendasPorDia.get(diaFormatado).vendasNesseDia
        : 0,
      totalSemDesconto: vendasPorDia.has(diaFormatado)
        ? vendasPorDia.get(diaFormatado).totalSemDesconto
        : 0,
      totalDescontado: vendasPorDia.has(diaFormatado)
        ? vendasPorDia.get(diaFormatado).totalDescontado
        : 0,
      totalComDesconto: vendasPorDia.has(diaFormatado)
        ? vendasPorDia.get(diaFormatado).totalComDesconto
        : 0,
    });
  }

  const totalSemDesconto = vendasCompletas.reduce(
    (acc, item) => acc + item.totalSemDesconto,
    0
  );
  const totalDescontado = vendasCompletas.reduce(
    (acc, item) => acc + item.totalDescontado,
    0
  );
  const totalComDesconto = totalSemDesconto - totalDescontado;

  const totalValues = {
    totalSemDesconto,
    totalDescontado,
    totalComDesconto,
  };

  return { data: vendasCompletas, totalValues };
}

async function getById(id: string) {
  if (!id) {
    throw {
      status: 401,
      message: "É preciso informar o ID para atualizar.",
    };
  }
  if (!isUUID(id)) {
    throw {
      status: 422,
      message: "Este ID não é válido!",
    };
  }
  const result = await saleRepository.getById(id);

  if (!result) {
    throw {
      status: 404,
      message: "Essa venda não foi encontrada",
    };
  }

  return result;
}

async function insert(data: CriarVendaRequest, userID: string) {
  try {
    const venda = await saleRepository.insert({
      ...data.venda,
      createdBy: userID,
    });

    const produtos = await Promise.all(
      data.produtos.map((product) =>
        salesProductsService.insert({
          vendaId: venda.id,
          produtoId: product.id,
          preco: product.preco,
          quantidade: product.quantidade,
        })
      )
    );

    console.log("✅ Produtos de cada venda informados com sucesso!");
    console.log(produtos);

    const atualizados: unknown[] = [];
    const errosAtualizar: unknown[] = [];

    const quantidades = await Promise.all(
      data.produtos.map((product) =>
        productService
          .removeQuantityFromStock(product.id, product.quantidade)
          .then((atualizar) => {
            atualizados.push(atualizar);
          })
          .catch((error) => {
            console.error(
              `Erro ao remover quantidade do produto com id ${product.id}`
            );
            console.error(error);
            errosAtualizar.push(error);
          })
      )
    );

    console.log("✅ Quantidades de cada produto decrementadas com sucesso!");
    console.log(quantidades);

    let ordemServico = null;

    if (data.ordemServico) {
      try {
        const ordemDeServico = await serviceOrderService.insert({
          ...data.ordemServico,
          ...(data.ordemServico.tipoArmacaoAC && {
            tipoArmacaoAC: data.ordemServico.tipoArmacaoAC === "1",
          }),
          ...(data.ordemServico.tipoArmacaoME && {
            tipoArmacaoME: data.ordemServico.tipoArmacaoME === "1",
          }),
          ...(data.ordemServico.tipoArmacaoNY && {
            tipoArmacaoNY: data.ordemServico.tipoArmacaoNY === "1",
          }),
          ...(data.ordemServico.tipoArmacaoPA && {
            tipoArmacaoPA: data.ordemServico.tipoArmacaoPA === "1",
          }),
          ...(data.ordemServico.somenteLente && {
            somenteLente: data.ordemServico.somenteLente === "1",
          }),
          ...(data.ordemServico.vaiTrazerArmacao && {
            vaiTrazerArmacao: data.ordemServico.vaiTrazerArmacao === "1",
          }),
          vendaId: venda.id,
          clienteId: venda.clienteId,
          createdBy: userID,
        });
        console.log("✅ Ordem de serviço criada com sucesso!");
        console.log(ordemDeServico);
        ordemServico = ordemDeServico;
      } catch (error) {
        console.log(error);
        ordemServico = error;
      }
    }

    return {
      venda,
      produtos,
      ...(ordemServico && { ordemServico }),
      atualizarQuantidades: {
        atualizados,
        erros: errosAtualizar.length > 0 ? errosAtualizar : null,
      },
    };
  } catch (error) {
    console.error("Erro inesperado:", error);
    throw {
      status: 400,
      message: "Erro inesperado!",
    };
  }
}

const saleService = {
  getAll,
  salesLastMonth,
  getById,
  insert,
};

export default saleService;
