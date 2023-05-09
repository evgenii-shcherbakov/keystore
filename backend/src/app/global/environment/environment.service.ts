import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentService {
  constructor(private readonly configService: ConfigService) {}

  get PORT(): string | number {
    return this.configService.get('PORT') ?? 5555;
  }
}
