/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { BankEntity } from 'src/banks/bank.entity';
import { CategoryEntity } from 'src/categories/category.entity';
import { TransactionEntity } from '../transaction.entity';

export class TransactionResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  type: 'profitable' | 'consumable';

  @ApiProperty()
  bankId: BankEntity;

  @ApiProperty()
  categoryIds: CategoryEntity[];

  @ApiProperty()
  createdAt: Date;

  constructor(transaction: TransactionEntity) {
    this.id = transaction.id;
    this.amount = transaction.amount;
    this.type = transaction.type;
    this.bankId = transaction.bank;
    this.categoryIds = transaction.categories;
    this.createdAt = transaction.createdAt;
  }
}

