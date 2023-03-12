/* eslint-disable prettier/prettier */
import { IsNumber, IsNotEmpty} from 'class-validator';
import { BankEntity } from 'src/banks/bank.entity';
import { CategoryEntity } from 'src/categories/category.entity';

export class TransactionCreateDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  type: 'profitable' | 'consumable';

  @IsNotEmpty()
  bank: BankEntity;

  @IsNotEmpty()
  categories: CategoryEntity[];
}