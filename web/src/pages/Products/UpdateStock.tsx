import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllProductsLowData,
  updateManyProductsQuantityStock,
} from "../../api/product";
import { useState } from "react";
import HeaderPage from "../../components/HeaderPage";
import SidebarAndHeader from "../../components/SidebarAndHeader";
import type {
  ProductLowStock,
  ProdutoAtualizarEstoque,
} from "../../interfaces/product.interface";
import { X } from "lucide-react";
import { Button } from "../../components/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function UpdateStock() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProductsLowData,
    staleTime: 1000 * 60,
  });

  const [availableProducts, setAvailableProducts] = useState<ProductLowStock[]>(
    [],
  );
  const [productUpdates, setProductUpdates] = useState<
    ProdutoAtualizarEstoque[]
  >([]);
  const [selectedProductId, setSelectedProductId] = useState<string>("");

  if (products && availableProducts.length === 0) {
    setAvailableProducts(products);
  }

  const handleAddProduct = () => {
    const selectedProduct = availableProducts.find(
      (prod) => prod.id === selectedProductId,
    );
    if (!selectedProduct) return;

    setProductUpdates([
      ...productUpdates,
      { id: selectedProduct.id, quantidade: 0 },
    ]);

    setAvailableProducts(
      availableProducts.filter((prod) => prod.id !== selectedProductId),
    );
    setSelectedProductId("");
  };

  const handleQuantityChange = (id: string, quantidade: number) => {
    setProductUpdates(
      productUpdates.map((prod) =>
        prod.id === id ? { ...prod, quantidade } : prod,
      ),
    );
  };

  const handleRemoveProduct = (id: string) => {
    const removedProduct = productUpdates.find((prod) => prod.id === id);
    if (!removedProduct) return;

    setProductUpdates(productUpdates.filter((prod) => prod.id !== id));
    const productDetails = products?.find((prod) => prod.id === id);
    if (productDetails) {
      setAvailableProducts([...availableProducts, productDetails]);
    }
  };

  const handleSubmit = async () => {
    try {
      await updateManyProductsQuantityStock({ produtos: productUpdates });
      toast.success("Estoque atualizado com sucesso!");
      setProductUpdates([]);
      setAvailableProducts(products || []);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
      queryClient.invalidateQueries({ queryKey: ["productsLowStock"] });
      navigate("/produtos");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar o estoque.");
    }
  };

  return (
    <SidebarAndHeader selected="Produtos">
      <main className="flex h-full flex-col">
        <HeaderPage
          title="Atualizar o estoque"
          link="/produtos"
          btnTitle="Voltar"
        />
        <section className="mx-4 overflow-y-scroll pb-8">
          {isLoading ? (
            <p>Carregando produtos...</p>
          ) : isError ? (
            <p>Erro ao buscar produtos...</p>
          ) : (
            <div className="mx-4 flex flex-1 flex-col justify-between gap-2">
              <div className="flex w-full flex-col gap-2">
                <h3 className="text-lg font-semibold">Selecione o Produto</h3>
                <select
                  className="rounded-md border border-zinc-400 px-2 py-1"
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                >
                  <option value="">Selecione um produto</option>
                  {availableProducts.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.nome} - Quantidade atual: {product.quantidade}
                    </option>
                  ))}
                </select>
                <Button
                  type="button"
                  variant="creation"
                  onClick={handleAddProduct}
                  disabled={!selectedProductId}
                >
                  Adicionar
                </Button>
              </div>

              <div className="mt-8 flex flex-col items-center justify-start gap-8 md:mt-2 md:gap-4">
                <h3 className="text-lg font-semibold">
                  Lista de Produtos para Atualização
                </h3>
                {productUpdates.map((product) => {
                  const productDetails = products?.find(
                    (prod) => prod.id === product.id,
                  );
                  return (
                    <div
                      key={product.id}
                      className="flex w-full flex-col items-center justify-center gap-2 md:flex-row"
                    >
                      <div className="flex w-full flex-col items-center justify-between md:w-1/2">
                        <p className="w-full text-nowrap text-center">
                          {productDetails
                            ? `${productDetails.nome} (Atual: ${productDetails.quantidade})`
                            : "Produto não encontrado"}
                        </p>
                        <p className="w-full text-center md:rounded-md md:border md:border-zinc-400 md:px-2 md:py-1">
                          {productDetails
                            ? `(Quantidade após atualizar: ${productDetails.quantidade + product.quantidade})`
                            : "Produto não encontrado"}
                        </p>
                      </div>
                      <div className="flex w-full flex-col items-center justify-between md:w-1/2">
                        <span>Quantidade para adicionar</span>
                        <div className="flex w-full flex-row items-center justify-between">
                          <input
                            type="number"
                            min="0"
                            className="w-full rounded-md border border-zinc-400 px-2 py-1"
                            value={product.quantidade}
                            onChange={(e) => {
                              const quantidade = Math.max(
                                0,
                                Number(e.target.value),
                              );
                              handleQuantityChange(product.id, quantidade);
                            }}
                          />
                          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                          <button
                            className="h-8 w-8"
                            onClick={() => handleRemoveProduct(product.id)}
                          >
                            <X />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
              <button
                className="mt-4 rounded bg-blue-500 p-2 text-white"
                onClick={handleSubmit}
                disabled={productUpdates.length === 0}
              >
                Enviar Atualizações
              </button>
            </div>
          )}
        </section>
      </main>
    </SidebarAndHeader>
  );
}
