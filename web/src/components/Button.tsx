import { forwardRef, type ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { Link } from "react-router-dom";

const button = tv({
  base: "flex items-center justify-center gap-2 rounded-lg text-md font-medium",
  variants: {
    variant: {
      creation:
        "bg-emerald-500 text-emerald-50 hover:bg-emerald-600 focus:outline-emerald-900 disabled:cursor-not-allowed disabled:bg-emerald-500/50",
      destructive:
        "bg-red-500 text-red-50 hover:bg-red-600 focus:outline-red-900 disabled:cursor-not-allowed disabled:bg-red-500/50",
      warning:
        "bg-orange-500 text-orange-50 hover:bg-orange-600 focus:outline-orange-900 disabled:cursor-not-allowed disabled:bg-orange-500/50",
      navigation:
        "bg-blueDeotica text-white hover:bg-sky-700 focus:outline-sky-950 disabled:cursor-not-allowed disabled:bg-sky-500/50",
    },
    size: {
      default: "px-4 py-2.5",
      sm: "px-3 py-1.5",
    },
  },
  defaultVariants: {
    variant: "navigation",
    size: "default",
  },
});

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof button> & {
    asLink?: boolean;
    to?: string;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asLink, to, className, variant, size, ...props }, ref) => {
    if (asLink && to) {
      return (
        <Link to={to} className={button({ variant, size, className })}>
          {props.children}
        </Link>
      );
    }

    return (
      <button
        {...props}
        ref={ref}
        className={button({ variant, size, className })}
      />
    );
  },
);

Button.displayName = "Button";
