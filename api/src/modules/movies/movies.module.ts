import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { StorageService } from './storage.service';
import { MoviesController } from './movies.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MoviesController],
  providers: [MoviesService, StorageService],
  exports: [MoviesService],
})
export class MoviesModule {}
