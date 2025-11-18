import {
  IsString,
  IsDate,
  IsNumber,
  IsOptional,
  IsUrl,
  Min,
  Max,
  IsNotEmpty,
  IsIn
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty({ message: 'Título é obrigatório' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Título original é obrigatório' })
  originalTitle: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty({ message: 'Data de lançamento é obrigatória' })
  releaseDate: Date;

  @IsString()
  @IsNotEmpty({ message: 'Descrição é obrigatória' })
  description: string;

  @IsNumber()
  @Min(0, { message: 'Orçamento não pode ser negativo' })
  @IsOptional()
  budget?: number;

  @IsNumber()
  @Min(1, { message: 'Duração deve ser pelo menos 1 minuto' })
  @Max(600, { message: 'Duração não pode exceder 600 minutos' })
  @IsNotEmpty({ message: 'Duração é obrigatória' })
  duration: number;

  @IsString({ message: 'URL do poster deve ser válida' })
  @IsOptional()
  posterUrl?: string;

  @IsString()
  @IsOptional()
  genre?: string;

  @IsString()
  @IsIn(['L', '10', '12', '14', '16', '18'], {
    message: 'Classificação deve ser: L, 10, 12, 14, 16 ou 18'
  })
  @IsOptional()
  rating?: string;

  @IsNumber()
  @Min(0, { message: 'Número de votos não pode ser negativo' })
  @IsOptional()
  votes?: number;

  @IsNumber()
  @Min(0, { message: 'Avaliação não pode ser menor que 0' })
  @Max(10, { message: 'Avaliação não pode ser maior que 10' })
  @IsOptional()
  score?: number;

  @IsString()
  @IsOptional()
  language?: string;

  @IsNumber()
  @Min(0, { message: 'Receita não pode ser negativa' })
  @IsOptional()
  revenue?: number;
}