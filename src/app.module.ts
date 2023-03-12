/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BanksModule } from './banks/bank.module';
import { TransactionsModule } from './transactions/transaction.module';
import { CategoriesModule } from './categories/category.module';
import { TypeOrmConfigService} from 'config/typeorm.config';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    BanksModule,
    TransactionsModule,
    CategoriesModule,
  ],
})
export class AppModule {}
