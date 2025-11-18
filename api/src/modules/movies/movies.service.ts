import {
  Injectable,
  NotFoundException,
  ForbiddenException
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { FilterMoviesDto } from './dto/filter-movies.dto';
import { StorageService } from './storage.service';

@Injectable()
export class MoviesService {
  constructor(
    private prismaService: PrismaService,
    private storageService: StorageService,
  ) { }

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

    const movieWithVirtualFields = this.addVirtualFields(movie);
    return this.generatePoster(movieWithVirtualFields);
  }

  async findAll(filterMoviesDto: FilterMoviesDto) {
    const {
      page = 1,
      limit = 10,
      search,
      minDuration,
      maxDuration,
      startDate,
      endDate,
      genre
    } = filterMoviesDto;

    const where: Prisma.MovieWhereInput = {
      deletedAt: null,
    };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { originalTitle: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (minDuration !== undefined || maxDuration !== undefined) {
      where.duration = {};
      if (minDuration !== undefined) where.duration.gte = minDuration;
      if (maxDuration !== undefined) where.duration.lte = maxDuration;
    }

    if (startDate !== undefined || endDate !== undefined) {
      where.releaseDate = {};
      if (startDate !== undefined) where.releaseDate.gte = startDate;
      if (endDate !== undefined) where.releaseDate.lte = endDate;
    }

    if (genre) {
      where.genre = { contains: genre, mode: 'insensitive' };
    }

    const skip = (page - 1) * limit;

    const [movies, total] = await Promise.all([
      this.prismaService.movie.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prismaService.movie.count({ where }),
    ]);

    const moviesWithVirtualFields = movies.map(movie => this.addVirtualFields(movie));
    const moviesWithPoster = await Promise.all(
      moviesWithVirtualFields.map(movie => this.generatePoster(movie))
    );

    return {
      movies: moviesWithPoster,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string, userId: string) {
    await this.validateMovieOwnership(id, userId);

    const movie = await this.findMovieWithUser(id);
    const movieWithVirtualFields = this.addVirtualFields(movie);
    return this.generatePoster(movieWithVirtualFields);
  }

  async update(id: string, updateMovieDto: UpdateMovieDto, userId: string) {
    await this.validateMovieOwnership(id, userId);

    const movie = await this.prismaService.movie.update({
      where: {
        id,
        deletedAt: null,
      },
      data: updateMovieDto,
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

  async remove(id: string, userId: string) {
    await this.validateMovieOwnership(id, userId);

    const movie = await this.prismaService.movie.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return {
      message: 'Filme excluído com sucesso',
      deletedAt: movie.deletedAt
    };
  }

  private async validateMovieOwnership(movieId: string, userId: string): Promise<void> {
    const movie = await this.findMovie(movieId);

    if (!movie) {
      throw new NotFoundException('Filme não encontrado');
    }

    if (movie.userId !== userId) {
      throw new ForbiddenException('Você não tem permissão para realizar esta ação');
    }
  }

  private async findMovie(id: string) {
    return this.prismaService.movie.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  private async findMovieWithUser(id: string) {
    return this.prismaService.movie.findUnique({
      where: {
        id,
        deletedAt: null,
      },
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

  private async generatePoster(movie: CreateMovieDto) {
    if (movie.posterUrl) {
      movie.posterUrl = await this.storageService.generateUrl(movie.posterUrl);
    }
    return movie;
  }
}