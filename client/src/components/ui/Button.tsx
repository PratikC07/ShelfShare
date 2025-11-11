import * as React from "react";
import { Slot } from "@radix-ui/react-slot"; // Import the helper
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg text-base font-bold leading-normal tracking-wide transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:opacity-90 active:scale-95",
        secondary:
          "bg-slate-200/80 text-slate-900 hover:bg-slate-300 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 active:scale-95",
        ghost:
          "text-slate-700 hover:text-primary dark:text-slate-300 dark:hover:text-primary",
        white:
          "bg-white text-primary shadow-lg hover:scale-105 active:scale-100",
      },
      size: {
        default: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean; // We change `asLink` to `asChild`
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // This is the polymorphic pattern you asked about!
    // If `asChild` is true, we use `Slot`.
    // `Slot` will merge its props (like `className`) onto its direct child.
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
