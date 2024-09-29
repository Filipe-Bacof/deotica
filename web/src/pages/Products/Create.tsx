import SidebarAndHeader from "../../components/SidebarAndHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerProduct } from "../../api/product";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { toast } from "react-toastify";
import HeaderPage from "../../components/HeaderPage";
import { createProductForm, type CreateProductForm } from "./Zod";
import ProductInputs from "../../components/input-forms/ProductInputs";

export default function CreateProduct() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { register, control, handleSubmit, formState, reset } =
    useForm<CreateProductForm>({
      resolver: zodResolver(createProductForm),
    });

  async function handleCreateProduct(data: CreateProductForm) {
    // console.log(data);
    await registerProduct(data)
      .then((data) => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        toast.success(
          `Produto ${data.nome.split(" ")[0]} cadastrado com sucesso!`,
        );
        reset();
        navigate("/produtos");
      })
      .catch((error) => {
        // console.log(error);
        error.response.data.map((error: string) => {
          toast.error(error);
        });
      });
  }

  return (
    <SidebarAndHeader selected="Produtos">
      <main className="flex h-full flex-col">
        <HeaderPage
          title="Criar novo produto"
          link="/produtos"
          btnTitle="Voltar"
        />
        <section className="overflow-y-scroll pb-8">
          <form
            onSubmit={handleSubmit(handleCreateProduct)}
            action=""
            className="mx-4 flex flex-1 flex-col justify-between gap-2"
          >
            <ProductInputs
              control={control}
              formState={formState}
              register={register}
            />
            <div className="flex w-full items-center justify-center">
              <Button variant="creation">Salvar</Button>
            </div>
          </form>
        </section>
      </main>
    </SidebarAndHeader>
  );
}
