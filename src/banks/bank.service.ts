import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankCreateDto } from './dto/create-bank.dto';
import { BankUpdateDto } from './dto/update-bank.dto';
import { Repository } from 'typeorm';
import { BankEntity } from './bank.entity';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(BankEntity)
    private readonly bankRepository: Repository<BankEntity>,
  ) {}

  async createBank(bankCreateDto: BankCreateDto): Promise<BankEntity> {
    const bank = this.bankRepository.create(bankCreateDto);
    await this.bankRepository.save(bank);
    return bank;
  }

  async getBankById(id: number): Promise<BankEntity> {
    const bank = await this.bankRepository.findOneBy({ id });
    if (!bank) {
      throw new Error(`Bank with id ${id} not found`);
    }
    return bank;
  }

  async getAllBanks(): Promise<BankEntity[]> {
    const banks = await this.bankRepository.find();
    return banks;
  }

  async updateBank(
    id: number,
    bankUpdateDto: BankUpdateDto,
  ): Promise<BankEntity> {
    const bank = await this.bankRepository.findOneBy({ id });
    if (!bank) {
      throw new Error(`Bank with id ${id} not found`);
    }
    const updatedBank = this.bankRepository.merge(bank, bankUpdateDto);
    await this.bankRepository.save(updatedBank);
    return bank;
  }

  async deleteBank(id: number): Promise<void> {
    const bank = await this.bankRepository.findOneBy({ id });
    if (!bank) {
      throw new Error(`Bank with id ${id} not found`);
    }
    const hasTransactions = await this.hasTransactions(id);
    if (hasTransactions) {
      throw new Error(
        `Bank with id ${id} has transactions and cannot be deleted`,
      );
    }
    await this.bankRepository.remove(bank);
  }

  async hasTransactions(bankId: number): Promise<boolean> {
    const bank = await this.bankRepository.findOne({
      where: { id: bankId },
      relations: ['transactions'],
    });
    return !!bank.transactions.length;
  }

  async getTransactionsForBank(bankId: number) {
    const bank = await this.bankRepository.findOne({
      where: { id: bankId },
      relations: ['transactions'],
    });

    if (!bank) {
      throw new Error(`Bank with ID ${bankId} not found`);
    }

    return bank.transactions;
  }
}
