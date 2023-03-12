/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber } from 'class-validator';

export class BankUpdateDto {
    @IsNotEmpty()
    name: string;
  
    @IsNumber()
    @IsNotEmpty()
    balance: number;
  }