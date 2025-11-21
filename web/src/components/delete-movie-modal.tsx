import { Button } from '@/components/ui/button'

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
  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-[480px] bg-box-bg border border-border rounded-sm shadow-lg mx-auto">
          <div className="p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-movie-secondary-text font-roboto">
                Deletar Filme
              </h2>
              <button
                onClick={onClose}
                className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                disabled={isLoading}
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4 my-3 sm:my-4">
              <p className="text-foreground font-roboto text-sm sm:text-base">
                Tem certeza que deseja deletar o filme{' '}
                <strong className="text-movie-primary-text">
                  "{movieTitle}"
                </strong>
                ?
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm font-roboto">
                Esta ação não pode ser desfeita. Todos os dados do filme serão
                permanentemente removidos.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-border">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                disabled={isLoading}
                className="order-2 sm:order-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={onConfirm}
                disabled={isLoading}
                className="bg-destructive hover:bg-destructive/90 order-1 sm:order-2"
              >
                {isLoading ? 'Deletando...' : 'Deletar Filme'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
