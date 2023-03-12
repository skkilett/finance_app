/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { BankResponseDto } from './response-bank.dto';

export class BanksResponseDto {
  @ApiProperty({ type: [BankResponseDto] })
  items: BankResponseDto[];

  @ApiProperty()
  total: number;

  constructor(items: BankResponseDto[]) {
    this.items = items;
    this.total = items.length;
  }
}