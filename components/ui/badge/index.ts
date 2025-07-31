import { cva, type VariantProps } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  "inline-flex items-center justify-center border font-medium w-fit whitespace-nowrap shrink-0 gap-1 [&>span.iconify]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        soft: "border-transparent bg-primary/10 text-primary [a&]:hover:bg-primary/50",
        warning:
          "border-transparent bg-amber-100 text-amber-600 [a&]:hover:bg-amber-200",
        success:
          "border-transparent bg-green-100 text-green-600 [a&]:hover:bg-green-200",
        info:
          "border-transparent bg-sky-100 text-sky-600 [a&]:hover:bg-sky-200",
        teal:
          "border-transparent bg-teal-100 text-teal-600 [a&]:hover:bg-teal-200",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        ghost:
          "border-transparent bg-accent text-primary [a&]:hover:bg-primary/90",
      },
      size: {
        default: "px-2 py-0.5 text-xs [&>span.iconify]:text-sm",
        lg: "px-4 py-1.5 text-sm [&>span.iconify]:text-lg",
      },
      rounded: {
        default: "rounded-md",
        pill: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
);
export type BadgeVariants = VariantProps<typeof badgeVariants>
