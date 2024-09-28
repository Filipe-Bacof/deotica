import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CheckCircle2, Circle } from "lucide-react";

export function RadioGroup(props: RadioGroupPrimitive.RadioGroupProps) {
  return (
    <RadioGroupPrimitive.RadioGroup
      {...props}
      className="flex flex-row gap-2"
    />
  );
}

export function RadioGroupItem(props: RadioGroupPrimitive.RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.RadioGroupItem
      {...props}
      className="group flex items-center justify-between gap-2 rounded-lg border border-zinc-400 bg-transparent px-4 py-2 outline-none ring-blue-500/10 hover:border-zinc-600 focus-visible:border-blue-500 focus-visible:ring-4 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500/5"
    />
  );
}

export function RadioGroupIndicator() {
  return (
    <>
      <Circle className="size-4 text-zinc-400 group-data-[state=checked]:hidden" />
      <CheckCircle2 className="hidden size-4 text-blue-500 group-data-[state=checked]:inline" />
    </>
  );
}
