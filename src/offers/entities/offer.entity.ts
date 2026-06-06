import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Auction } from 'src/auctions/entities/auction.entity';

@Entity('offers')
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  amount!: number;

  @Column()
  bidder!: string;

  @ManyToOne(() => Auction)
  auction!: Auction;

  @CreateDateColumn()
  createdAt!: Date;
}
