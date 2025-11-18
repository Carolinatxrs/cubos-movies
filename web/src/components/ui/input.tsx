import type { ComponentProps } from 'react'

import { cn } from '@/utils/merge-classes'

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return (
    <input
      className={cn(
        'bg-input text-foreground rounded-sm h-11 transition-colors placeholder:text-foreground/50 dark:placeholder:text-muted p-3',
        'border border-border outline-none focus:border-primary',
        'font-roboto text-base font-normal',
        'selection:bg-primary selection:text-primary-foreground',
        'disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}
