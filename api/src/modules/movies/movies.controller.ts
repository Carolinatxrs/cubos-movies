import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { FilterMoviesDto } from './dto/filter-movies.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { StorageService } from './storage.service';

@Controller('movies')
@UseGuards(JwtAuthGuard)
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly storageService: StorageService,
  ) { }

  @Post()
  create(
    @Body() createMovieDto: CreateMovieDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.moviesService.create(createMovieDto, user.id);
  }

  @Get()
  findAll(@Query() filterMoviesDto: FilterMoviesDto) {
    return this.moviesService.findAll(filterMoviesDto);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: { id: string },
  ) {
    return this.moviesService.findOne(id, user.id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMovieDto: UpdateMovieDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.moviesService.update(id, updateMovieDto, user.id);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: { id: string },
  ) {
    return this.moviesService.remove(id, user.id);
  }

  @Post('upload-poster')
  @UseInterceptors(FileInterceptor('poster'))
  uploadPoster(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 2,
          }),
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg)' }),
        ],
      })
    ) file: Express.Multer.File,
  ) {
    return this.storageService.upload({
      filename: file.originalname,
      fileType: file.mimetype,
      body: file.buffer,
    });
  }
}