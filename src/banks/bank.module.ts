/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankEntity } from './bank.entity';


@Module({
  imports: [TypeOrmModule.forFeature([BankEntity])],
  providers: [BankService],
  controllers: [BankController],
  exports: [BankService]
})
export class BanksModule {}
