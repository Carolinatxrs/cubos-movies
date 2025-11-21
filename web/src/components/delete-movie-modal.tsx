import { Button } from '@/components/ui/button'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'

interface DeleteMovieModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  movieTitle: string
  isLoading?: boolean
}

export function DeleteMovieModal({
  isOpen,
  onClose,
  onConfirm,
  movieTitle,
  isLoading = false,
}: DeleteMovieModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border p-6">
        <DialogHeader>
          <DialogTitle className="text-foreground font-inter text-xl">
            Deletar Filme
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 my-4">
          <p className="text-foreground font-roboto">
            Tem certeza que deseja deletar o filme{' '}
            <strong>"{movieTitle}"</strong>?
          </p>
          <p className="text-muted-foreground text-sm font-roboto">
            Esta ação não pode ser desfeita. Todos os dados do filme serão
            permanentemente removidos.
          </p>
        </div>

        <div className="flex gap-3 justify-end pt-4 ">
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isLoading ? 'Deletando...' : 'Deletar Filme'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
