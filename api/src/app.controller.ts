import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  async getHealth() {
    try {
      await this.prismaService.$queryRaw`SELECT 1`;
      return {
        status: 'OK',
        database: 'Connected',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: 'Error',
        database: 'Disconnected',
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }

}
