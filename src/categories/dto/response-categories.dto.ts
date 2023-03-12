/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { CategoryResponseDto } from './response-category.dto';

export class CategoriesResponseDto {
  @ApiProperty({ type: [CategoryResponseDto] })
  items: CategoryResponseDto[];

  @ApiProperty()
  total: number;

  constructor(items: CategoryResponseDto[]) {
    this.items = items;
    this.total = items.length;
  }
}
