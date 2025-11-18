import { ChevronLeftIcon as ChevronLeft } from '@/assets/chevron-left-icon'
import { ChevronRightIcon as ChevronRight } from '@/assets/chevron-right-icon'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-12 h-11 flex items-center justify-center rounded-sm bg-primary text-primary-foreground disabled:bg-muted disabled:text-muted-foreground transition-colors"
      >
        <ChevronLeft className="size-5" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-12 h-11 flex items-center justify-center rounded-sm font-roboto text-base transition-colors ${
            page === currentPage
              ? 'bg-[#EBEAF814] text-foreground'
              : 'bg-primary text-primary-foreground hover:bg-[#8045b4]'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-12 h-11 flex items-center justify-center rounded-sm bg-primary text-primary-foreground disabled:bg-muted disabled:text-muted-foreground transition-colors"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  )
}