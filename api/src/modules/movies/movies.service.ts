import {
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private prismaService: PrismaService) { }

  async create(createMovieDto: CreateMovieDto, userId: string) {
    const movieData = {
      ...createMovieDto,
      userId,
    };

    const movie = await this.prismaService.movie.create({
      data: movieData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return this.addVirtualFields(movie);
  }

  private addVirtualFields(movie: CreateMovieDto) {
    const today = new Date();
    const releaseDate = new Date(movie.releaseDate);

    const profit = movie.revenue && movie.budget
      ? movie.revenue - movie.budget
      : undefined;

    let status: string;

    if (releaseDate <= today) {
      status = 'Lançado';
    } else {
      status = 'Em breve';
    }

    return {
      ...movie,
      profit,
      status,
    };
  }
}