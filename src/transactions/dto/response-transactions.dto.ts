import { ApiProperty } from '@nestjs/swagger';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';
import { TransactionEntity } from '../transaction.entity';

export class TransactionsResponseDto {
  @ApiProperty({ type: [TransactionEntity] })
  transactions: TransactionEntity[];

  @ApiProperty()
  meta: IPaginationMeta;
  constructor(data: Pagination<TransactionEntity>) {
    this.transactions = data.items;
    this.meta = data.meta;
  }
}
