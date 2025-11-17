import { IsOptional, IsNumber, Min, IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterMoviesDto {
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  page?: number = 1;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  limit?: number = 10;

  @IsString()
  @IsOptional()
  search?: string;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  minDuration?: number;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  maxDuration?: number;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: Date;

  @IsString()
  @IsOptional()
  genre?: string;
}