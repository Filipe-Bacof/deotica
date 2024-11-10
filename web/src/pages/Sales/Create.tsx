import { useState } from "react";
import HeaderPage from "../../components/HeaderPage";
import SidebarAndHeader from "../../components/SidebarAndHeader";
import {
  ordemServicoDefault,
  produtoDefault,
  vendaDefault,
} from "../../utils/createSaleInputs";
import type { CriarVendaRequest } from "../../interfaces/sale.interface";
import type {
  CriarOS,
  TipoDeLente,
} from "../../interfaces/serviceOrder.interface";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Select from "react-select";
import { getAllClients } from "../../api/client";
import { getAllProducts } from "../../api/product";
import { getAllPaymentMethods } from "../../api/payment";
import { Button } from "../../components/Button";
import { createSale } from "../../api/sale";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "../../components/RadioGroup";
import tipoLente1 from "../../assets/lentes-modelos/1.svg";
import tipoLente2 from "../../assets/lentes-modelos/2.svg";
import tipoLente3 from "../../assets/lentes-modelos/3.svg";
import tipoLente4 from "../../assets/lentes-modelos/4.svg";
import tipoLente5 from "../../assets/lentes-modelos/5.svg";
import tipoLente6 from "../../assets/lentes-modelos/6.svg";
import { Check } from "lucide-react";

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
          queryClient.invalidateQueries({ queryKey: ["salesLastMonth"] });
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
      <button
        type="button"
        onClick={() => {
          console.log(saleData);
          console.log(serviceOrderData);
        }}
      >
        debug
      </button>
      <main className="flex h-full flex-col">
        <HeaderPage title="Nova Venda" link="/vendas" btnTitle="Voltar" />
        <section className="w-full overflow-y-scroll pb-8">
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
                  <h3 className="text-lg font-semibold">Olho Direito</h3>
                  <div className="flex w-full flex-col flex-wrap items-center justify-between md:flex-row">
                    <div className="flex w-full flex-col gap-2 md:w-1/3">
                      <label htmlFor="olhoDireitoEsf">ESF</label>
                      <input
                        type="text"
                        id="olhoDireitoEsf"
                        className="rounded-md border border-zinc-400 px-2 py-1"
                        placeholder="ESF"
                        value={serviceOrderData.olhoDireitoEsf}
                        onChange={(e) => {
                          setServiceOrderData({
                            ...serviceOrderData,
                            olhoDireitoEsf: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="flex w-full flex-col gap-2 md:w-1/3">
                      <label htmlFor="olhoDireitoCil">CIL</label>
                      <input
                        type="text"
                        id="olhoDireitoCil"
                        className="rounded-md border border-zinc-400 px-2 py-1"
                        placeholder="CIL"
                        value={serviceOrderData.olhoDireitoCil}
                        onChange={(e) => {
                          setServiceOrderData({
                            ...serviceOrderData,
                            olhoDireitoCil: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="flex w-full flex-col gap-2 md:w-1/3">
                      <label htmlFor="olhoDireitoEixo">EIXO</label>
                      <input
                        type="text"
                        id="olhoDireitoEixo"
                        className="rounded-md border border-zinc-400 px-2 py-1"
                        placeholder="EIXO"
                        value={serviceOrderData.olhoDireitoEixo}
                        onChange={(e) => {
                          setServiceOrderData({
                            ...serviceOrderData,
                            olhoDireitoEixo: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex w-full flex-col flex-wrap items-center justify-between md:flex-row">
                    <div className="flex w-full flex-col gap-2 md:w-1/2">
                      <label htmlFor="olhoDireitoDNP">DNP</label>
                      <input
                        type="text"
                        id="olhoDireitoDNP"
                        className="rounded-md border border-zinc-400 px-2 py-1"
                        placeholder="DNP"
                        value={serviceOrderData.olhoDireitoDNP}
                        onChange={(e) => {
                          setServiceOrderData({
                            ...serviceOrderData,
                            olhoDireitoDNP: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="flex w-full flex-col gap-2 md:w-1/2">
                      <label htmlFor="olhoDireitoAltura">ALT</label>
                      <input
                        type="text"
                        id="olhoDireitoAltura"
                        className="rounded-md border border-zinc-400 px-2 py-1"
                        placeholder="ALT"
                        value={serviceOrderData.olhoDireitoAltura}
                        onChange={(e) => {
                          setServiceOrderData({
                            ...serviceOrderData,
                            olhoDireitoAltura: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold">Olho Esquerdo</h3>
                  <div className="flex w-full flex-col flex-wrap items-center justify-between md:flex-row">
                    <div className="flex w-full flex-col gap-2 md:w-1/3">
                      <label htmlFor="olhoEsquerdoEsf">ESF</label>
                      <input
                        type="text"
                        id="olhoEsquerdoEsf"
                        className="rounded-md border border-zinc-400 px-2 py-1"
                        placeholder="ESF"
                        value={serviceOrderData.olhoEsquerdoEsf}
                        onChange={(e) => {
                          setServiceOrderData({
                            ...serviceOrderData,
                            olhoEsquerdoEsf: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="flex w-full flex-col gap-2 md:w-1/3">
                      <label htmlFor="olhoEsquerdoCil">CIL</label>
                      <input
                        type="text"
                        id="olhoEsquerdoCil"
                        className="rounded-md border border-zinc-400 px-2 py-1"
                        placeholder="CIL"
                        value={serviceOrderData.olhoEsquerdoCil}
                        onChange={(e) => {
                          setServiceOrderData({
                            ...serviceOrderData,
                            olhoEsquerdoCil: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="flex w-full flex-col gap-2 md:w-1/3">
                      <label htmlFor="olhoEsquerdoEixo">EIXO</label>
                      <input
                        type="text"
                        id="olhoEsquerdoEixo"
                        className="rounded-md border border-zinc-400 px-2 py-1"
                        placeholder="EIXO"
                        value={serviceOrderData.olhoEsquerdoEixo}
                        onChange={(e) => {
                          setServiceOrderData({
                            ...serviceOrderData,
                            olhoEsquerdoEixo: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex w-full flex-col flex-wrap items-center justify-between md:flex-row">
                    <div className="flex w-full flex-col gap-2 md:w-1/2">
                      <label htmlFor="olhoEsquerdoDNP">DNP</label>
                      <input
                        type="text"
                        id="olhoEsquerdoDNP"
                        className="rounded-md border border-zinc-400 px-2 py-1"
                        placeholder="DNP"
                        value={serviceOrderData.olhoEsquerdoDNP}
                        onChange={(e) => {
                          setServiceOrderData({
                            ...serviceOrderData,
                            olhoEsquerdoDNP: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="flex w-full flex-col gap-2 md:w-1/2">
                      <label htmlFor="olhoEsquerdoAltura">ALT</label>
                      <input
                        type="text"
                        id="olhoEsquerdoAltura"
                        className="rounded-md border border-zinc-400 px-2 py-1"
                        placeholder="ALT"
                        value={serviceOrderData.olhoEsquerdoAltura}
                        onChange={(e) => {
                          setServiceOrderData({
                            ...serviceOrderData,
                            olhoEsquerdoAltura: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex w-full flex-col gap-2">
                    <label className="font-bold" htmlFor="adicao">
                      Adição
                    </label>
                    <input
                      type="text"
                      id="adicao"
                      className="rounded-md border border-zinc-400 px-2 py-1"
                      placeholder="Adição"
                      value={serviceOrderData.adicao}
                      onChange={(e) => {
                        setServiceOrderData({
                          ...serviceOrderData,
                          adicao: e.target.value,
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
                  <div className="flex w-full flex-col flex-wrap items-center justify-between md:flex-row">
                    <label htmlFor="tipoLente">Tipo de Lente</label>
                    <RadioGroup
                      onValueChange={(e: TipoDeLente) => {
                        setServiceOrderData({
                          ...serviceOrderData,
                          tipoLente: e,
                        });
                      }}
                      value={serviceOrderData.tipoLente}
                    >
                      <RadioGroupItem value={"1"}>
                        <RadioGroupIndicator />
                        <span className="text-sm font-medium leading-none text-zinc-800">
                          1
                        </span>
                        <img
                          className="h-12 w-12"
                          src={tipoLente1}
                          alt="tipoLente1"
                        />
                      </RadioGroupItem>
                      <RadioGroupItem value={"2"}>
                        <RadioGroupIndicator />
                        <span className="text-sm font-medium leading-none text-zinc-800">
                          2
                        </span>
                        <img
                          className="h-12 w-12"
                          src={tipoLente2}
                          alt="tipoLente2"
                        />
                      </RadioGroupItem>
                      <RadioGroupItem value={"3"}>
                        <RadioGroupIndicator />
                        <span className="text-sm font-medium leading-none text-zinc-800">
                          3
                        </span>
                        <img
                          className="h-12 w-12"
                          src={tipoLente3}
                          alt="tipoLente3"
                        />
                      </RadioGroupItem>
                      <RadioGroupItem value={"4"}>
                        <RadioGroupIndicator />
                        <span className="text-sm font-medium leading-none text-zinc-800">
                          4
                        </span>
                        <img
                          className="h-12 w-12"
                          src={tipoLente4}
                          alt="tipoLente4"
                        />
                      </RadioGroupItem>
                      <RadioGroupItem value={"5"}>
                        <RadioGroupIndicator />
                        <span className="text-sm font-medium leading-none text-zinc-800">
                          5
                        </span>
                        <img
                          className="h-12 w-12"
                          src={tipoLente5}
                          alt="tipoLente5"
                        />
                      </RadioGroupItem>
                      <RadioGroupItem value={"6"}>
                        <RadioGroupIndicator />
                        <span className="text-sm font-medium leading-none text-zinc-800">
                          6
                        </span>
                        <img
                          className="h-12 w-12"
                          src={tipoLente6}
                          alt="tipoLente6"
                        />
                      </RadioGroupItem>
                    </RadioGroup>
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
                    <label htmlFor="tipoArmacao">Tipo de Armacao</label>
                    <div className="flex flex-wrap gap-4">
                      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                      <div
                        className={`cursor-pointer select-none rounded-md border px-4 py-1 ${serviceOrderData.tipoArmacaoAC === "1" ? "border-blueDeotica text-blueDeotica" : "border-black text-black"}`}
                        onClick={() => {
                          setServiceOrderData((state) => {
                            const newValue =
                              state.tipoArmacaoAC === "0" ? "1" : "0";
                            return {
                              ...state,
                              tipoArmacaoAC: newValue,
                            };
                          });
                        }}
                      >
                        AC
                      </div>
                      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                      <div
                        className={`cursor-pointer select-none rounded-md border px-4 py-1 ${serviceOrderData.tipoArmacaoME === "1" ? "border-blueDeotica text-blueDeotica" : "border-black text-black"}`}
                        onClick={() => {
                          setServiceOrderData((state) => {
                            const newValue =
                              state.tipoArmacaoME === "0" ? "1" : "0";
                            return {
                              ...state,
                              tipoArmacaoME: newValue,
                            };
                          });
                        }}
                      >
                        ME
                      </div>
                      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                      <div
                        className={`cursor-pointer select-none rounded-md border px-4 py-1 ${serviceOrderData.tipoArmacaoNY === "1" ? "border-blueDeotica text-blueDeotica" : "border-black text-black"}`}
                        onClick={() => {
                          setServiceOrderData((state) => {
                            const newValue =
                              state.tipoArmacaoNY === "0" ? "1" : "0";
                            return {
                              ...state,
                              tipoArmacaoNY: newValue,
                            };
                          });
                        }}
                      >
                        NY
                      </div>
                      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                      <div
                        className={`cursor-pointer select-none rounded-md border px-4 py-1 ${serviceOrderData.tipoArmacaoPA === "1" ? "border-blueDeotica text-blueDeotica" : "border-black text-black"}`}
                        onClick={() => {
                          setServiceOrderData((state) => {
                            const newValue =
                              state.tipoArmacaoPA === "0" ? "1" : "0";
                            return {
                              ...state,
                              tipoArmacaoPA: newValue,
                            };
                          });
                        }}
                      >
                        PA
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full flex-row flex-wrap items-center justify-between">
                    <div className="flex w-full flex-col gap-2 md:w-1/5">
                      <label htmlFor="armacaoMD">MD</label>
                      <input
                        type="text"
                        id="armacaoMD"
                        className="rounded-md border border-zinc-400 px-2 py-1"
                        placeholder="Maior Diagonal"
                        value={serviceOrderData.armacaoMD}
                        onChange={(e) => {
                          setServiceOrderData({
                            ...serviceOrderData,
                            armacaoMD: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="flex w-full flex-col gap-2 md:w-1/5">
                      <label htmlFor="armacaoTA">TA</label>
                      <input
                        type="text"
                        id="armacaoTA"
                        className="rounded-md border border-zinc-400 px-2 py-1"
                        placeholder="Tamanho da Armação"
                        value={serviceOrderData.armacaoTA}
                        onChange={(e) => {
                          setServiceOrderData({
                            ...serviceOrderData,
                            armacaoTA: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="flex w-full flex-col gap-2 md:w-1/5">
                      <label htmlFor="armacaoHoriz">Horiz.</label>
                      <input
                        type="text"
                        id="armacaoHoriz"
                        className="rounded-md border border-zinc-400 px-2 py-1"
                        placeholder="Horizontal"
                        value={serviceOrderData.armacaoHoriz}
                        onChange={(e) => {
                          setServiceOrderData({
                            ...serviceOrderData,
                            armacaoHoriz: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="flex w-full flex-col gap-2 md:w-1/5">
                      <label htmlFor="armacaoPonte">Ponte</label>
                      <input
                        type="text"
                        id="armacaoPonte"
                        className="rounded-md border border-zinc-400 px-2 py-1"
                        placeholder="Ponte"
                        value={serviceOrderData.armacaoPonte}
                        onChange={(e) => {
                          setServiceOrderData({
                            ...serviceOrderData,
                            armacaoPonte: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="flex w-full flex-col gap-2 md:w-1/5">
                      <label htmlFor="armacaoVert">Vert.&#40;h&#41;</label>
                      <input
                        type="text"
                        id="armacaoVert"
                        className="rounded-md border border-zinc-400 px-2 py-1"
                        placeholder="Vertical "
                        value={serviceOrderData.armacaoVert}
                        onChange={(e) => {
                          setServiceOrderData({
                            ...serviceOrderData,
                            armacaoVert: e.target.value,
                          });
                        }}
                      />
                    </div>
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
                  {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                  <div
                    className="flex w-full cursor-pointer flex-row gap-2"
                    onClick={() => {
                      setServiceOrderData((state) => {
                        const newValue = state.somenteLente === "0" ? "1" : "0";
                        return {
                          ...state,
                          somenteLente: newValue,
                        };
                      });
                    }}
                  >
                    <div
                      className={`flex h-6 w-6 cursor-pointer select-none items-start justify-center rounded-md border ${serviceOrderData.somenteLente === "1" ? "border-blueDeotica text-blueDeotica" : "border-black text-black"}`}
                    >
                      {serviceOrderData.somenteLente === "1" && (
                        <Check className="h-6 w-6" />
                      )}
                    </div>
                    <label
                      className={`cursor-pointer select-none ${serviceOrderData.somenteLente === "1" ? "text-blueDeotica" : "text-black"}`}
                      htmlFor="armacao"
                    >
                      Somente Lente
                    </label>
                  </div>
                  {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                  <div
                    className="flex w-full cursor-pointer flex-row gap-2"
                    onClick={() => {
                      setServiceOrderData((state) => {
                        const newValue =
                          state.vaiTrazerArmacao === "0" ? "1" : "0";
                        return {
                          ...state,
                          vaiTrazerArmacao: newValue,
                        };
                      });
                    }}
                  >
                    <div
                      className={`flex h-6 w-6 cursor-pointer select-none items-start justify-center rounded-md border ${serviceOrderData.vaiTrazerArmacao === "1" ? "border-blueDeotica text-blueDeotica" : "border-black text-black"}`}
                    >
                      {serviceOrderData.vaiTrazerArmacao === "1" && (
                        <Check className="h-6 w-6" />
                      )}
                    </div>
                    <label
                      className={`cursor-pointer select-none ${serviceOrderData.vaiTrazerArmacao === "1" ? "text-blueDeotica" : "text-black"}`}
                      htmlFor="vaiTrazerArmacao"
                    >
                      Vai Trazer Armacao
                    </label>
                  </div>
                </>
              )}
              <Button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
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
