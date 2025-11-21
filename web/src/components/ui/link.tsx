import type { ComponentProps } from 'react'

import { cn } from '@/utils/merge-classes'

export function Link({ className, ...props }: ComponentProps<'a'>) {
  return (
    <a
      className={cn(
        'font-roboto text-base font-normal text-primary hover:text-primary transition-colors cursor-pointer underline hover:no-underline',
        className,
      )}
      {...props}
    />
  )
}
