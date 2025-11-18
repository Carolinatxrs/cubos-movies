import { useParams } from 'react-router'

export function MovieDetails() {
  const { movieId } = useParams()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Detalhes do Filme</h1>
      <p className="text-foreground">Detalhes do filme {movieId} serão implementados aqui.</p>
    </div>
  )
}