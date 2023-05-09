import { Injectable } from '@nestjs/common';
import { HeathCheckDto } from './shared/dto/health-check.dto';

@Injectable()
export class AppService {
  healthCheck(): HeathCheckDto {
    return { status: 'ok' };
  }
}
