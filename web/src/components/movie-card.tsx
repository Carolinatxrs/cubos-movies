import { useState } from 'react'
import { useNavigate } from 'react-router'

interface MovieCardProps {
  id: string
  title: string
  poster: string
  genre?: string
}

export function MovieCard({ id, title, poster, genre = "Ação" }: MovieCardProps) {
  const navigate = useNavigate()
  const [imageError, setImageError] = useState(false)

  const handleClick = () => {
    navigate(`/movies/${id}`)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div
      className="w-[235px] h-[355px] rounded-sm overflow-hidden cursor-pointer group relative bg-card border border-border transition-all hover:scale-105 hover:shadow-lg"
      onClick={handleClick}
    >
      <div className="w-full h-full relative">
        <img
          src={imageError ? '/placeholder-movie.jpg' : poster}
          alt={title}
          className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-75"
          onError={handleImageError}
        />

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="relative">
          <h3
            className="text-white font-montserrat font-semibold text-base leading-tight uppercase mb-1 line-clamp-2 drop-shadow-lg"
          >
            {title}
          </h3>

          <div
            className="text-gray-300 font-montserrat font-normal text-xs leading-none transition-all duration-300 overflow-hidden opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 drop-shadow-lg"
          >
            {genre}
          </div>
        </div>
      </div>
    </div>
  )
}