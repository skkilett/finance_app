/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionEntity } from '../transactions/transaction.entity';

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: 'profitable' | 'consumable';

  @CreateDateColumn()
  createdAt: Date

  @ManyToMany(() => TransactionEntity)
  transactions: TransactionEntity[];
}
