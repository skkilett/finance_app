/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BankEntity } from '../banks/bank.entity';
import { CategoryEntity } from 'src/categories/category.entity';

@Entity()
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  type: 'profitable' | 'consumable';

  @ManyToOne(() => BankEntity, (bank) => bank.transactions)
  bank: BankEntity;

  @ManyToMany(() => CategoryEntity)
  @JoinTable()
  categories: CategoryEntity[]

  @CreateDateColumn()
  createdAt: Date
}
