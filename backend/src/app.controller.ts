import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HeathCheckDto } from './shared/dto/health-check.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('status')
  healthCheck(): HeathCheckDto {
    return this.appService.healthCheck();
  }
}
