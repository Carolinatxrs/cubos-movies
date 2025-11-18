import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge classnames with tailwind-merge and clsx for tailwindcss classes.
 *
 * @param inputs An array of class values (strings, objects, arrays) to be merged
 * @returns A string of merged class names optimized for Tailwind CSS
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
