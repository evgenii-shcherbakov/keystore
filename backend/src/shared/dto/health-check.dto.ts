import { ApiProperty } from '@nestjs/swagger';

export class HeathCheckDto {
  @ApiProperty()
  readonly status: string;
}
