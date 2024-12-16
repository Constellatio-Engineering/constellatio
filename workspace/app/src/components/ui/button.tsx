import { cn } from "@/lib/utils";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 rounded-full",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-10 px-4 py-2",
        icon: "h-10 w-10",
        lg: "h-11 px-8",
        sm: "h-9 px-3",
      },
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        ghost: "border border-muted-3 hover:border-muted-6",
        link: "text-primary underline-offset-4 hover:underline",
        outline: "bg-background hover:bg-muted-2 hover:border hover:border-muted-6",
        secondary: "border border-input bg-background hover:bg-muted-2 hover:border-muted-9",
      },
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> 
{
  readonly asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    asChild = false,
    className,
    size,
    variant,
    ...props
  }, ref) => 
  {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ className, size, variant }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
