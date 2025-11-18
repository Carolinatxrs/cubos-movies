import type { ComponentProps } from 'react'

import { cn } from '@/utils/merge-classes'

export function Label({ className, ...props }: ComponentProps<'label'>) {
  return (
    <label
      className={cn('font-roboto font-bold text-xs leading-none', className)}
      {...props}
    />
  )
}
