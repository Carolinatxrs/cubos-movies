import type { SVGProps } from 'react'

import { cn } from '@/utils/merge-classes'

export function LogoIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-9 h-[35px]', className)}
      {...props}
    >
      <path
        d="M2.8129 7.67544C2.8129 4.95017 5.09492 2.73298 7.89986 2.73298H27.7406C30.5457 2.73298 32.8276 4.95017 32.8276 7.67544V26.9527C32.8276 29.6779 30.5457 31.8951 27.7406 31.8951H7.89986C5.09492 31.8951 2.8129 29.6779 2.8129 26.9527V7.67544ZM7.89986 34.6277H27.7406C32.0967 34.6277 35.6406 31.185 35.6406 26.9527V7.67544C35.6406 3.44316 32.0967 0 27.7406 0H7.89986C3.54383 0 0 3.44316 0 7.67544V26.9527C0 31.185 3.54383 34.6277 7.89986 34.6277Z"
        fill="currentColor"
      />
    </svg>
  )
}
