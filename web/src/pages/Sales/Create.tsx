import { useState } from "react";
import HeaderPage from "../../components/HeaderPage";
import SidebarAndHeader from "../../components/SidebarAndHeader";
import {
  ordemServicoDefault,
  produtoDefault,
  vendaDefault,
} from "../../utils/createSaleInputs";
import type { CriarVendaRequest } from "../../interfaces/sale.interface";
import type { CriarOS } from "../../interfaces/serviceOrder.interface";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Select from "react-select";
import { getAllClients } from "../../api/client";
import { getAllProducts } from "../../api/product";
import { getAllPaymentMethods } from "../../api/payment";
import { Button } from "../../components/Button";
import { createSale } from "../../api/sale";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateSale() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [saleData, setSaleData] = useState<CriarVendaRequest>(vendaDefault);
  const [serviceOrderData, setServiceOrderData] =
    useState<CriarOS>(ordemServicoDefault);
  const [hasOS, setHasOS] = useState<boolean>(false);

  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: getAllClients,
    staleTime: 1000 * 60,
  });

  const { data: paymentMethods } = useQuery({
    queryKey: ["paymentMethods"],
    queryFn: getAllPaymentMethods,
    staleTime: 1000 * 60,
  });

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 1000 * 60,
  });

  if (!clients && !paymentMethods && !products) {
    return (
      <SidebarAndHeader selected="Vendas">
        <p>Carregando</p>
      </SidebarAndHeader>
    );
  }

  const optionsClients = clients?.map((client) => ({
    value: client.id,
    label: `${client.nome} | CPF ${client.cpf}`,
  }));

  const optionsPayments = paymentMethods?.map((payment) => ({
    value: payment.id,
    label: payment.descricao,
  }));

  const optionsProducts = products?.map((product) => ({
    value: product.id,
    label: `${product.nome} | ${product.genero} | ${product.marca} | ${product.modelo} | R$ ${Number(product.preco).toFixed(2)} (${product.quantidade})`,
  }));

  function handleAddProduct() {
    // console.log(saleData);
    setSaleData((prevSaleData) => ({
      ...prevSaleData,
      produtos: [...prevSaleData.produtos, produtoDefault],
    }));
  }

  function handleDeleteProduct(indexToDelete: number) {
    if (saleData.produtos.length === 1) {
      setSaleData((prevSaleData) => ({
        ...prevSaleData,
        produtos: [produtoDefault],
      }));
    } else {
      const updatedList = saleData.produtos.filter(
        (_, index) => index !== indexToDelete,
      );
      setSaleData((prevSaleData) => ({
        ...prevSaleData,
        produtos: updatedList,
      }));
    }
  }

  function handleCreateSale() {
    try {
      const dataCreateSale = saleData;
      if (hasOS) {
        dataCreateSale.ordemServico = serviceOrderData;
      }

      console.log(dataCreateSale);
      createSale(dataCreateSale)
        .then((data) => {
          console.log(data);
          if (
            data.atualizarQuantidades.erros &&
            data.atualizarQuantidades.erros.length > 0
          ) {
            data.atualizarQuantidades.erros.map((error) => {
              // console.error(error)
              toast.error(error as string);
            });
          }
          queryClient.invalidateQueries({ queryKey: ["sales"] });
          queryClient.invalidateQueries({ queryKey: ["sale"] });
          toast.success("Venda efetuada com sucesso!");
          navigate(`/vendas/view/${data.venda.id}`);
        })
        .catch((error) => {
          // console.error(error);
          error.response.data.map((error: string) => {
            toast.error(error);
          });
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <SidebarAndHeader selected="Vendas">
      {/* <button
        type="button"
        onClick={() => {
          console.log(saleData);
          console.log(serviceOrderData);
        }}
      >
        debug
      </button> */}
      <main className="flex h-full flex-col">
        <HeaderPage title="Nova Venda" link="/vendas" btnTitle="Voltar" />
        <section className="overflow-y-scroll pb-8">
          <div className="mx-4 flex flex-1 flex-col justify-between gap-2">
            <form className="flex min-h-screen w-full flex-col gap-2">
              <h3 className="text-lg font-semibold">Dados da Venda</h3>
              <div className="flex w-full flex-col gap-2">
                <label htmlFor="clienteId">Cliente</label>
                <Select
                  id="clienteId"
                  options={optionsClients}
                  onChange={(selectedOption) => {
                    setSaleData({
                      ...saleData,
                      venda: {
                        ...saleData.venda,
                        clienteId: selectedOption?.value || "",
                      },
                    });
                  }}
                  placeholder="Selecione o cliente"
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <label htmlFor="formaDePagamentoId">Forma de Pagamento</label>
                <Select
                  id="formaDePagamentoId"
                  options={optionsPayments}
                  onChange={(selectedOption) => {
                    setSaleData({
                      ...saleData,
                      venda: {
                        ...saleData.venda,
                        formaDePagamentoId: selectedOption?.value || 0,
                      },
                    });
                  }}
                  placeholder="Selecione a Forma de Pagamento"
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <label htmlFor="numeroDeParcelas">Número de Parcelas</label>
                <input
                  type="number"
                  id="numeroDeParcelas"
                  className="rounded-md border border-zinc-400 px-2 py-1"
                  placeholder="Digite o número de Parcelas"
                  value={saleData.venda.numeroDeParcelas}
                  onChange={(e) => {
                    setSaleData({
                      ...saleData,
                      venda: {
                        ...saleData.venda,
                        numeroDeParcelas: Number(e.target.value) || 0,
                      },
                    });
                  }}
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <label htmlFor="valorDeEntrada">Valor de Entrada</label>
                <input
                  type="number"
                  id="valorDeEntrada"
                  className="rounded-md border border-zinc-400 px-2 py-1"
                  placeholder="Digite o valor de entrada"
                  value={saleData.venda.valorDeEntrada}
                  onChange={(e) => {
                    setSaleData({
                      ...saleData,
                      venda: {
                        ...saleData.venda,
                        valorDeEntrada: Number(e.target.value) || 0,
                      },
                    });
                  }}
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <label htmlFor="desconto">Desconto</label>
                <input
                  type="number"
                  id="desconto"
                  className="rounded-md border border-zinc-400 px-2 py-1"
                  placeholder="Digite o valor do desconto"
                  value={saleData.venda.desconto}
                  onChange={(e) => {
                    setSaleData({
                      ...saleData,
                      venda: {
                        ...saleData.venda,
                        desconto: Number(e.target.value) || 0,
                      },
                    });
                  }}
                />
              </div>
              <h3 className="text-lg font-semibold">Produtos</h3>
              {saleData.produtos.map((produto, index) => (
                <div
                  key={`${index}-${produto.id}`}
                  className="rounded-md border border-slate-400 p-4"
                >
                  <div className="flex w-full flex-col gap-2">
                    <label htmlFor={`produto-${index}`}>
                      {index + 1}º produto
                    </label>
                    <Select
                      id={`produto-${index}`}
                      options={optionsProducts ?? []}
                      value={
                        (optionsProducts ?? []).find(
                          (option) => option.value === produto.id,
                        ) || null
                      }
                      onChange={(selectedOption) => {
                        const updatedProdutos = [...saleData.produtos];
                        updatedProdutos[index] = {
                          ...updatedProdutos[index],
                          id: selectedOption?.value || "",
                        };
                        setSaleData({
                          ...saleData,
                          produtos: updatedProdutos,
                        });
                      }}
                      placeholder="Selecione o produto"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <label htmlFor={`quantidade-${index}`}>Quantidade</label>
                    <input
                      type="number"
                      id={`quantidade-${index}`}
                      className="rounded-md border border-zinc-400 px-2 py-1"
                      value={produto.quantidade}
                      onChange={(e) => {
                        const updatedProdutos = [...saleData.produtos];
                        updatedProdutos[index].quantidade =
                          Number(e.target.value) || 0;
                        setSaleData({
                          ...saleData,
                          produtos: updatedProdutos,
                        });
                      }}
                    />
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <label htmlFor={`preco-${index}`}>Preço</label>
                    <input
                      type="number"
                      id={`preco-${index}`}
                      className="rounded-md border border-zinc-400 px-2 py-1"
                      value={produto.preco}
                      onChange={(e) => {
                        const updatedProdutos = [...saleData.produtos];
                        updatedProdutos[index].preco =
                          Number(e.target.value) || 0;
                        setSaleData({
                          ...saleData,
                          produtos: updatedProdutos,
                        });
                      }}
                    />
                  </div>
                  <Button
                    type="button"
                    className="mt-2"
                    onClick={() => handleDeleteProduct(index)}
                    variant="destructive"
                  >
                    Remover Produto
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={handleAddProduct}
                variant="creation"
              >
                Adicionar Produto
              </Button>
              <div className="mt-4 flex w-full flex-col items-center justify-between gap-4 md:flex-row">
                <h3 className="w-full text-lg font-semibold md:w-1/2">
                  Ordem de Serviço
                </h3>
                <div className="flex w-full flex-row gap-2 md:w-1/2 md:justify-end">
                  <input
                    id="hasOS"
                    type="checkbox"
                    checked={hasOS}
                    onChange={() => setHasOS((state) => !state)}
                  />
                  <label htmlFor="hasOS">Possui Ordem de Serviço</label>
                </div>
              </div>
              {hasOS && (
                <>
                  <div className="flex w-full flex-col gap-2">
                    <label htmlFor="dataDeEntrega">Data de Entrega</label>
                    <input
                      type="date"
                      id="dataDeEntrega"
                      className="rounded-md border border-zinc-400 px-2 py-1"
                      placeholder="Selecione a data de entrega"
                      value={
                        serviceOrderData.dataDeEntrega
                          ? serviceOrderData.dataDeEntrega
                              .toISOString()
                              .substr(0, 10)
                          : ""
                      }
                      onChange={(e) => {
                        setServiceOrderData({
                          ...serviceOrderData,
                          dataDeEntrega: e.target.value
                            ? new Date(e.target.value)
                            : undefined,
                        });
                      }}
                    />
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <label htmlFor="concluido">Status da OS</label>
                    <select
                      name="concluido"
                      id="concluido"
                      className="rounded-md border border-zinc-400 px-2 py-1"
                      value={serviceOrderData.concluido}
                      onChange={(e) => {
                        const value = e.target.value as
                          | "pendente"
                          | "retirada"
                          | "finalizado"
                          | undefined;
                        setServiceOrderData({
                          ...serviceOrderData,
                          concluido: value,
                        });
                      }}
                    >
                      <option value={undefined}>
                        Selecione o Status da OS
                      </option>
                      <option value="pendente">Pendente</option>
                      <option value="retirada">Retirada</option>
                      <option value="finalizado">Finalizado</option>
                    </select>
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <label htmlFor="olhoEsquerdo">Olho Esquerdo</label>
                    <input
                      type="text"
                      id="olhoEsquerdo"
                      className="rounded-md border border-zinc-400 px-2 py-1"
                      placeholder="Informações sobre o Olho Esquerdo"
                      value={serviceOrderData.olhoEsquerdo}
                      onChange={(e) => {
                        setServiceOrderData({
                          ...serviceOrderData,
                          olhoEsquerdo: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <label htmlFor="olhoDireito">Olho Direito</label>
                    <input
                      type="text"
                      id="olhoDireito"
                      className="rounded-md border border-zinc-400 px-2 py-1"
                      placeholder="Informações sobre o Olho Direito"
                      value={serviceOrderData.olhoDireito}
                      onChange={(e) => {
                        setServiceOrderData({
                          ...serviceOrderData,
                          olhoDireito: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <label htmlFor="tipoLente">Tipo de Lente</label>
                    <input
                      type="text"
                      id="tipoLente"
                      className="rounded-md border border-zinc-400 px-2 py-1"
                      placeholder="Informações sobre o Tipo de Lente"
                      value={serviceOrderData.tipoLente}
                      onChange={(e) => {
                        setServiceOrderData({
                          ...serviceOrderData,
                          tipoLente: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <label htmlFor="corLente">Cor da Lente</label>
                    <input
                      type="text"
                      id="corLente"
                      className="rounded-md border border-zinc-400 px-2 py-1"
                      placeholder="Informações sobre a Cor da Lente"
                      value={serviceOrderData.corLente}
                      onChange={(e) => {
                        setServiceOrderData({
                          ...serviceOrderData,
                          corLente: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <label htmlFor="modeloLente">Modelo da Lente</label>
                    <input
                      type="text"
                      id="modeloLente"
                      className="rounded-md border border-zinc-400 px-2 py-1"
                      placeholder="Informações sobre o Modelo da Lente"
                      value={serviceOrderData.modeloLente}
                      onChange={(e) => {
                        setServiceOrderData({
                          ...serviceOrderData,
                          modeloLente: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <label htmlFor="tratamentos">Tratamentos</label>
                    <input
                      type="text"
                      id="tratamentos"
                      className="rounded-md border border-zinc-400 px-2 py-1"
                      placeholder="Informações sobre tratamentos"
                      value={serviceOrderData.tratamentos}
                      onChange={(e) => {
                        setServiceOrderData({
                          ...serviceOrderData,
                          tratamentos: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <label htmlFor="observacoes">Observações</label>
                    <input
                      type="text"
                      id="observacoes"
                      className="rounded-md border border-zinc-400 px-2 py-1"
                      placeholder="Observações relevantes sobre a OS"
                      value={serviceOrderData.observacoes}
                      onChange={(e) => {
                        setServiceOrderData({
                          ...serviceOrderData,
                          observacoes: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="flex w-full flex-row gap-2 md:justify-start">
                    <input
                      id="somenteLente"
                      type="checkbox"
                      checked={serviceOrderData.somenteLente}
                      onChange={() => {
                        setServiceOrderData((state) => {
                          return {
                            ...serviceOrderData,
                            somenteLente: !state.somenteLente,
                          };
                        });
                      }}
                    />
                    <label htmlFor="hasOS">Somente Lente</label>
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <label htmlFor="armacao">Armação</label>
                    <input
                      type="text"
                      id="armacao"
                      disabled={serviceOrderData.somenteLente}
                      className="rounded-md border border-zinc-400 px-2 py-1"
                      placeholder="Armação"
                      value={serviceOrderData.armacao}
                      onChange={(e) => {
                        setServiceOrderData({
                          ...serviceOrderData,
                          armacao: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <label htmlFor="tipoArmacao">Tipo de Armacao</label>
                    <input
                      type="text"
                      id="tipoArmacao"
                      disabled={serviceOrderData.somenteLente}
                      className="rounded-md border border-zinc-400 px-2 py-1"
                      placeholder="Tipo de Armação"
                      value={serviceOrderData.tipoArmacao}
                      onChange={(e) => {
                        setServiceOrderData({
                          ...serviceOrderData,
                          tipoArmacao: e.target.value,
                        });
                      }}
                    />
                  </div>
                </>
              )}
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleCreateSale();
                }}
                type="button"
                variant="creation"
              >
                Finalizar Venda
              </Button>
            </form>
          </div>
        </section>
      </main>
    </SidebarAndHeader>
  );
}
