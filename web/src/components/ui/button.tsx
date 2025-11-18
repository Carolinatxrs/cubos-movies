import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'

import { cn } from '@/utils/merge-classes'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 shrink-0 rounded-xs font-roboto font-normal transition-colors text-base outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] cursor-pointer disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-[#8045b4] dark:hover:bg-[#9A5CD0] active:bg-[#6B3B8A] dark:active:bg-[#8457AA]',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-[#712f942e] dark:hover:bg-[#C150FF2E] active:bg-[#B412F90A] dark:active:bg-[#B412F90A] dark:disabled:bg-[#EBEAF814] dark:disabled:text-[#ECE9FD7D]',
      },
      size: {
        default: 'px-5 py-3',
        icon: 'px-5 py-3 [&_svg:not([class*="size-"])]:size-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}
