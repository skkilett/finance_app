import { ApiProperty } from '@nestjs/swagger';

export class StatisticsRequestDto {
  @ApiProperty()
  categoryIds: number[];

  @ApiProperty()
  fromPeriod: Date;

  @ApiProperty()
  toPeriod: Date;
}
