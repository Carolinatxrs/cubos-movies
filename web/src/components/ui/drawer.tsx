import { type ReactNode } from 'react'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export function Drawer({ isOpen, onClose, children }: DrawerProps) {
  if (!isOpen) return null

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      <div className="fixed right-0 top-0 h-full w-[565px] bg-[#232225] z-50 rounded-l-sm overflow-y-auto">
        {children}
      </div>
    </>
  )
}