import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Auction } from '../auctions/entities/auction.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,

    @InjectRepository(Auction)
    private readonly auctionsRepository: Repository<Auction>,
  ) {}

  async create(
    auctionId: string,
    createOfferDto: CreateOfferDto,
  ): Promise<Offer> {
    const auction = await this.auctionsRepository.findOne({
      where: { id: auctionId },
    });

    if (!auction) {
      throw new NotFoundException('Auction not found');
    }

    if (auction.endDate < new Date()) {
      throw new ConflictException('Auction is already closed');
    }

    if (createOfferDto.amount <= auction.currentPrice) {
      throw new ConflictException('Offer must be higher than current price');
    }

    const offer = this.offersRepository.create({
      ...createOfferDto,
      auction,
    });

    auction.currentPrice = createOfferDto.amount;

    await this.auctionsRepository.save(auction);

    return this.offersRepository.save(offer);
  }
}
