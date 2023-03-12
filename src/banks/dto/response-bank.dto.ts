/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { BankEntity } from '../bank.entity';
import { TransactionEntity } from 'src/transactions/transaction.entity';

export class BankResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  balance: number;

  @ApiProperty()
  transactions: TransactionEntity[];

  constructor(entity: BankEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.balance = entity.balance;
    this.transactions = entity.transactions
  }
}