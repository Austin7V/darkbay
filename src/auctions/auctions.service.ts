import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAuctionDto } from './dto/create-auction.dto';
import { Auction } from './entities/auction.entity';

@Injectable()
export class AuctionsService {
  constructor(
    @InjectRepository(Auction)
    private readonly auctionsRepository: Repository<Auction>,
  ) {}

  findAll(): Promise<Auction[]> {
    return this.auctionsRepository.find();
  }

  create(createAuctionDto: CreateAuctionDto): Promise<Auction> {
    const endDate =
      createAuctionDto.endDate ??
      new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

    const auction = this.auctionsRepository.create({
      ...createAuctionDto,
      currentPrice: createAuctionDto.startingPrice,
      endDate,
    });

    return this.auctionsRepository.save(auction);
  }
}
