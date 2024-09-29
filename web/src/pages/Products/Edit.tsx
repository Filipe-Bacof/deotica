import { useQuery, useQueryClient } from "@tanstack/react-query";
import HeaderPage from "../../components/HeaderPage";
import SidebarAndHeader from "../../components/SidebarAndHeader";
import { useNavigate, useParams } from "react-router-dom";
import { editProduct, getProductById } from "../../api/product";
import { Button } from "../../components/Button";
import { createProductForm, type CreateProductForm } from "./Zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ProductInputs from "../../components/input-forms/ProductInputs";
import { useEffect } from "react";

export default function EditProduct() {
  const { id } = useParams();
  const idProduct = id || "0";
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", idProduct],
    queryFn: () => getProductById(idProduct),
    staleTime: 1000 * 60,
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { register, control, handleSubmit, formState, reset, setValue } =
    useForm<CreateProductForm>({
      resolver: zodResolver(createProductForm),
    });

  useEffect(() => {
    if (data) {
      setValue("nome", data.nome);
      setValue("quantidade", data.quantidade);
      setValue("preco", Number(data.preco));
      setValue("status", data.status);
      data.codigoDeBarras && setValue("codigoDeBarras", data.codigoDeBarras);
      data.marca && setValue("marca", data.marca);
      data.modelo && setValue("modelo", data.modelo);
      data.tipo && setValue("tipo", data.tipo);
      data.genero && setValue("genero", data.genero);
      data.produtoAtivo && setValue("produtoAtivo", data.produtoAtivo);
    }
  }, [data, setValue]);

  async function handleUpdateProduct(data: CreateProductForm) {
    // console.log(data);
    await editProduct(idProduct, data)
      .then((data) => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        queryClient.invalidateQueries({ queryKey: ["product"] });
        toast.success(
          `Produto ${data.nome.split(" ")[0]} atualizado com sucesso!`,
        );
        reset();
        navigate(`/produtos/view/${idProduct}`);
      })
      .catch((error) => {
        console.log(error);
        // error.response.data.map((error: string) => {
        //   toast.error(error);
        // });
      });
  }

  return (
    <SidebarAndHeader selected="Produtos">
      <main className="flex h-full flex-col">
        <HeaderPage
          title="Editar dados do produto"
          link="/produtos"
          btnTitle="Voltar"
        />
        <section className="mx-4 overflow-y-scroll pb-8">
          {isLoading ? (
            <p>Carregando...</p>
          ) : isError ? (
            <p>Erro ao localizar este produto</p>
          ) : data ? (
            <>
              <form
                onSubmit={handleSubmit(handleUpdateProduct)}
                action=""
                className="mx-4 flex flex-1 flex-col justify-between gap-2"
              >
                <ProductInputs
                  control={control}
                  formState={formState}
                  register={register}
                />
                <div className="flex w-full items-center justify-center gap-4">
                  <Button
                    type="button"
                    asLink
                    to={`/produtos/view/${idProduct}`}
                    variant="navigation"
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" variant="warning">
                    Atualizar
                  </Button>
                </div>
              </form>
            </>
          ) : null}
        </section>
      </main>
    </SidebarAndHeader>
  );
}
