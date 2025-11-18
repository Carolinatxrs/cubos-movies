import { SearchIcon as Search  } from '@/assets/search-icon'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = "Buscar filme..." }: SearchBarProps) {
  return (
    <div className="relative flex-1 max-w-[488px]">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-11 px-4 pr-12 bg-input text-foreground rounded-sm border border-border outline-none focus:border-primary transition-colors font-roboto text-base placeholder:text-muted-foreground"
      />
      <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground size-5" />
    </div>
  )
}