import { ApiProperty } from '@nestjs/swagger';

export class StatisticsResponseDto {
  @ApiProperty({ example: { category1: 100, category2: -50 } })
  data: { [categoryName: string]: number };

  constructor(data: { [categoryName: string]: number }) {
    this.data = data;
  }
}
