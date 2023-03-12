/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from '../category.entity';
import { TransactionResponseDto } from 'src/transactions/dto/response-transaction.dto';
import { TransactionEntity } from 'src/transactions/transaction.entity';

export class CategoryResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type: 'profitable' | 'consumable';

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ type: () => TransactionResponseDto, isArray: true })
  transactions: TransactionEntity[];

  constructor(category: CategoryEntity) {
    this.id = category.id;
    this.name = category.name;
    this.type = category.type;
    this.createdAt = category.createdAt;
    this.transactions = category.transactions;
  }
}