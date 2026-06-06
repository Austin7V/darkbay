import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Offer } from 'src/offers/entities/offer.entity';

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

  @OneToMany(() => Offer, (offer) => offer.auction)
  offers!: Offer[];

  @CreateDateColumn()
  createdAt!: Date;
}
