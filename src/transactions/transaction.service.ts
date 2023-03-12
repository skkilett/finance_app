import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from './transaction.entity';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { TransactionCreateDto } from './dto/create-transaction.dto';
import { BankService } from 'src/banks/bank.service';
import { BankEntity } from 'src/banks/bank.entity';
import { StatisticsRequestDto } from './dto/statistics-dto/statistics-request.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    private readonly bankService: BankService,
  ) {}

  async getTransactionSign(
    transactionType: 'profitable' | 'consumable',
  ): Promise<number> {
    if (transactionType == 'consumable') {
      return -1;
    }
    return 1;
  }

  async createTransaction(
    transactionCreateDto: TransactionCreateDto,
  ): Promise<TransactionEntity> {
    const bank = await this.bankService.getBankById(
      transactionCreateDto.bank.id,
    );
    if (!bank) {
      throw new NotFoundException(
        `Bank with id ${transactionCreateDto.bank.id} not found`,
      );
    }
    if (bank.balance < transactionCreateDto.amount) {
      throw new Error(
        `Not enough money in bank with id ${transactionCreateDto.bank.id}`,
      );
    }
    bank.balance =
      bank.balance +
      transactionCreateDto.amount *
        (await this.getTransactionSign(transactionCreateDto.type));
    transactionCreateDto.bank = bank;
    const transaction = this.transactionRepository.create(transactionCreateDto);
    await this.transactionRepository.save(transaction);
    await this.bankService.updateBank(transactionCreateDto.bank.id, bank);
    return transaction;
  }

  async deleteTransaction(id: number): Promise<void> {
    const transaction: TransactionEntity =
      await this.transactionRepository.findOne({
        where: { id: id },
        relations: ['bank'],
      });
    console.log(transaction.bank);
    console.log(transaction);

    const bank: BankEntity = await this.bankService.getBankById(
      transaction.bank.id,
    );
    bank.balance =
      bank.balance -
      transaction.amount * (await this.getTransactionSign(transaction.type));
    await this.bankService.updateBank(transaction.bank.id, bank);
    await this.transactionRepository.delete(id);
  }

  async getAllTransactions(
    page = 1,
    limit = 10,
  ): Promise<Pagination<TransactionEntity>> {
    const options = { page, limit };
    return await paginate<TransactionEntity>(
      this.transactionRepository,
      options,
    );
  }

  async getStatistics(
    statisticsRequestDto: StatisticsRequestDto,
  ): Promise<{ [key: string]: number }> {
    const { categoryIds, fromPeriod, toPeriod } = statisticsRequestDto;

    try {
      const queryBuilder = this.transactionRepository
        .createQueryBuilder('transaction')
        .leftJoin('transaction.categories', 'category')
        .select(
          'category.name, category.type, SUM(transaction.amount)',
          'statistics',
        )
        .where(
          'category.id IN (:...categoryIds) AND transaction.createdAt BETWEEN :fromPeriod AND :toPeriod',
          {
            categoryIds,
            fromPeriod,
            toPeriod,
          },
        )
        .groupBy('category.name, category.type');

      const statistics = await queryBuilder.getRawMany();

      const result: { [name: string]: number } = {};
      statistics.forEach((stat) => {
        const categoryName = stat.name;
        const categoryType = stat.type;
        const balance =
          categoryType === 'profitable' ? stat.statistics : -stat.statistics;
        result[categoryName] = balance;
      });

      return result;
    } catch (error) {
      console.log(`Error in getStatistics: ${error.message}`);
      throw error;
    }
  }
}
