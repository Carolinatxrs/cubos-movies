import { type ComponentProps, useRef } from 'react'

import { cn } from '@/utils/merge-classes'

import { Button } from './button'

interface FileInputProps extends Omit<ComponentProps<'input'>, 'type'> {
  onFileSelect: (file: File) => void
  accept?: string
}

export function FileInput({
  onFileSelect,
  accept = 'image/*',
  className,
  ...props
}: FileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onFileSelect(file)
    }
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
        {...props}
      />
      <Button
        type="button"
        variant="secondary"
        onClick={handleClick}
        className="w-full"
      >
        Selecionar Poster
      </Button>
    </div>
  )
}
