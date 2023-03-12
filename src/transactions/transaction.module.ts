import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './transaction.entity';
import { BanksModule } from 'src/banks/bank.module';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity]), BanksModule],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionsModule {}
