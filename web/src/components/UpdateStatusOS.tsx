import { Controller, useForm } from "react-hook-form";
import { RadioGroup, RadioGroupIndicator, RadioGroupItem } from "./RadioGroup";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { updateServiceOrderStatus } from "../api/serviceOrder";
import { Button } from "./Button";

const statusOS = ["pendente", "retirada", "finalizado"];

const updateStatusForm = z.object({
  concluido: z.enum(["pendente", "retirada", "finalizado"]),
});

type UpdateStatusForm = z.infer<typeof updateStatusForm>;

type UpdateStatusOSProps = {
  id: number;
  valueOS: "pendente" | "retirada" | "finalizado";
};

export default function UpdateStatusOS({ id, valueOS }: UpdateStatusOSProps) {
  const queryClient = useQueryClient();

  const { control, handleSubmit } = useForm<UpdateStatusForm>({
    resolver: zodResolver(updateStatusForm),
  });

  async function handleUpdateOS(data: UpdateStatusForm) {
    // console.log(data);
    await updateServiceOrderStatus(id, data)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["serviceOrder"] });
        queryClient.invalidateQueries({ queryKey: ["serviceOrders"] });
        toast.success("Status da OS atualizado com sucesso");
      })
      .catch((error) => {
        // console.log(error);
        error.response.data.map((error: string) => {
          toast.error(error);
        });
      });
  }

  return (
    <form
      onSubmit={handleSubmit(handleUpdateOS)}
      action=""
      className="mx-4 flex flex-1 flex-col justify-between gap-2"
    >
      <label className="text-center" htmlFor="">
        Atualizar o Status da OS:
      </label>
      <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
        <Controller
          control={control}
          name="concluido"
          defaultValue={valueOS}
          render={({ field }) => {
            return (
              <RadioGroup
                onValueChange={field.onChange}
                value={String(field.value)}
              >
                {statusOS.map((item) => (
                  <RadioGroupItem key={item} value={item}>
                    <RadioGroupIndicator />
                    <span className="text-sm font-medium leading-none text-zinc-800">
                      {item}
                    </span>
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            );
          }}
        />
        <Button variant="warning">Atualizar</Button>
      </div>
    </form>
  );
}
