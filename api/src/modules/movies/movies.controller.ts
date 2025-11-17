import {
  Controller,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('movies')
@UseGuards(JwtAuthGuard)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) { }

  @Post()
  create(
    @Body() createMovieDto: CreateMovieDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.moviesService.create(createMovieDto, user.id);
  }
}