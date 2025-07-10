import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export { default as Textarea } from "./Textarea.vue";

export const textareaVariants = cva(
  "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex w-full min-w-0 text-base transition-colors outline-none overflow-hidden resize-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default: [
          "dark:bg-input/30 border-input min-h-[60px] rounded-md border bg-transparent px-3 py-2 shadow-xs transition-[color,box-shadow]",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        ],
        underline: [
          "bg-transparent px-0 py-2 min-h-[60px] border-0 border-b-2 border-muted-foreground/20 rounded-none",
          "text-base placeholder:text-muted-foreground",
          "focus:outline-none focus:border-transparent",
          "bg-gradient-to-r from-primary to-primary bg-no-repeat bg-[length:0_2px] bg-left-bottom transition-[background-size] duration-300 ease-in-out",
          "focus:bg-[length:100%_2px]",
          "aria-invalid:bg-none aria-invalid:focus:bg-none aria-invalid:border-b-destructive",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type TextareaVariants = VariantProps<typeof textareaVariants>;
