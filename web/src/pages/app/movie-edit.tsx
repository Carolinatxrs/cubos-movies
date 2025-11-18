import { useParams } from 'react-router'

export function MovieEdit() {
  const { movieId } = useParams()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Editar Filme</h1>
      <p className="text-foreground">Formulário para editar filme {movieId} será implementado aqui.</p>
    </div>
  )
}