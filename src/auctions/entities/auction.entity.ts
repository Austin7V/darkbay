import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('auctions')
export class Auction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column()
  startingPrice!: number;

  @Column()
  currentPrice!: number;

  @Column()
  endDate!: Date;

  @Column()
  seller!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
