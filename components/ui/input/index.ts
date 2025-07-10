import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export { default as Input } from "./Input.vue";

export const inputVariants = cva(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 text-base transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default: [
          "dark:bg-input/30 border-input rounded-md border bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow]",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        ],
        underline: [
          "bg-transparent px-0 py-2 h-9 text-base border-0 border-b-2 border-muted-foreground/20 rounded-none",
          "placeholder:text-muted-foreground",
          "focus:outline-none focus:border-transparent",
          // Animated underline:
          "bg-gradient-to-r from-primary to-primary bg-no-repeat bg-[length:0_2px] bg-left-bottom transition-[background-size] duration-300 ease-in-out",
          "focus:bg-[length:100%_2px]",
          // 🛑 Disable animation if invalid
          "aria-invalid:bg-none aria-invalid:focus:bg-none aria-invalid:border-b-destructive",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type InputVariants = VariantProps<typeof inputVariants>;
