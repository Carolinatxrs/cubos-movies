import * as React from 'react'

interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

interface DialogContentProps {
  children: React.ReactNode
  className?: string
}

interface DialogHeaderProps {
  children: React.ReactNode
  className?: string
}

interface DialogTitleProps {
  children: React.ReactNode
  className?: string
}

const DialogContext = React.createContext<{
  open: boolean
  onOpenChange: (open: boolean) => void
}>({
  open: false,
  onOpenChange: () => {
    return
  },
})

export function Dialog({ open = false, onOpenChange, children }: DialogProps) {
  return (
    <DialogContext
      value={{
        open,
        onOpenChange:
          onOpenChange ??
          (() => {
            return
          }),
      }}
    >
      {children}
    </DialogContext>
  )
}

export function DialogContent({
  children,
  className = '',
}: DialogContentProps) {
  const { open, onOpenChange } = React.use(DialogContext)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />

      {/* Content */}
      <div
        className={`
        relative z-50 
        w-full max-w-md 
        rounded-sm 
        border 
        shadow-lg 
        ${className}
      `}
      >
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 w-6 h-6 flex items-center justify-center bg-muted text-foreground text-sm font-bold"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}

export function DialogHeader({ children, className = '' }: DialogHeaderProps) {
  return (
    <div
      className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}
    >
      {children}
    </div>
  )
}

export function DialogTitle({ children, className = '' }: DialogTitleProps) {
  return (
    <h2
      className={`text-lg font-semibold leading-none tracking-tight ${className}`}
    >
      {children}
    </h2>
  )
}
