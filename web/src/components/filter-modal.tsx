import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { type MoviesFilters } from '@/services/movies/list-movies-service'

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilters: (filters: MoviesFilters) => void
  onClearFilters: () => void
  isLoading?: boolean
}

export function FilterModal({
  isOpen,
  onClose,
  onApplyFilters,
  onClearFilters,
  isLoading = false,
}: FilterModalProps) {
  const [filters, setFilters] = useState<{
    genre?: string
    minDuration?: number
    maxDuration?: number
    startDate?: string
    endDate?: string
  }>({})

  const handleInputChange = (field: string, value: string | number) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value === '' ? undefined : value,
    }))
  }

  const handleApply = () => {
    onApplyFilters({
      genre: filters.genre,
      minDuration: filters.minDuration,
      maxDuration: filters.maxDuration,
      startDate: filters.startDate,
      endDate: filters.endDate,
    })
    onClose()
  }

  const handleClear = () => {
    setFilters({})
    onClearFilters()
    onClose()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleApply()
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-[480px] bg-box-bg border border-border rounded-sm shadow-lg mx-auto max-h-[90vh] overflow-y-auto">
          <div className="p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-movie-secondary-text font-roboto">
                Filtros
              </h2>
              <button
                onClick={onClose}
                className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                disabled={isLoading}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="genre" className="text-foreground font-roboto">
                  Gênero
                </Label>
                <Input
                  id="genre"
                  type="text"
                  value={filters.genre ?? ''}
                  onChange={(e) => handleInputChange('genre', e.target.value)}
                  placeholder="Ex: Ação, Drama, Ficção Científica"
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-foreground font-roboto">
                  Duração (minutos)
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label
                      htmlFor="minDuration"
                      className="text-sm text-muted-foreground"
                    >
                      Mínima
                    </Label>
                    <Input
                      id="minDuration"
                      type="number"
                      min="0"
                      value={filters.minDuration ?? ''}
                      onChange={(e) =>
                        handleInputChange(
                          'minDuration',
                          parseInt(e.target.value) || 0,
                        )
                      }
                      placeholder="0"
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="maxDuration"
                      className="text-sm text-muted-foreground"
                    >
                      Máxima
                    </Label>
                    <Input
                      id="maxDuration"
                      type="number"
                      min="0"
                      value={filters.maxDuration ?? ''}
                      onChange={(e) =>
                        handleInputChange(
                          'maxDuration',
                          parseInt(e.target.value) || 0,
                        )
                      }
                      placeholder="300"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-foreground font-roboto">
                  Data de Lançamento
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label
                      htmlFor="startDate"
                      className="text-sm text-muted-foreground"
                    >
                      Início
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={filters.startDate ?? ''}
                      onChange={(e) =>
                        handleInputChange('startDate', e.target.value)
                      }
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="endDate"
                      className="text-sm text-muted-foreground"
                    >
                      Fim
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={filters.endDate ?? ''}
                      onChange={(e) =>
                        handleInputChange('endDate', e.target.value)
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-border">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleClear}
                  disabled={isLoading}
                  className="order-2 sm:order-1"
                >
                  Limpar
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="order-1 sm:order-2"
                >
                  {isLoading ? 'Aplicando...' : 'Aplicar Filtros'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
