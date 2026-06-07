import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAuctionDto } from './dto/create-auction.dto';
import { Auction } from './entities/auction.entity';
import { AuctionResponseDto } from './dto/auction-response.dto';

@Injectable()
export class AuctionsService {
  constructor(
    @InjectRepository(Auction)
    private readonly auctionsRepository: Repository<Auction>,
  ) {}

  async findAll(): Promise<AuctionResponseDto[]> {
    const auctions = await this.auctionsRepository.find();

    // Hier wandeln wir jede Auction Entity in ein Response DTO um.
    return auctions.map((auction) => this.toAuctionResponse(auction));
  }

  async findOne(id: string): Promise<AuctionResponseDto> {
    const auction = await this.auctionsRepository.findOne({
      where: { id },
    });

    if (!auction) {
      throw new NotFoundException('Auction not found');
    }

    return this.toAuctionResponse(auction);
  }

  async create(
    createAuctionDto: CreateAuctionDto,
  ): Promise<AuctionResponseDto> {
    const endDate =
      createAuctionDto.endDate ??
      new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

    const auction = this.auctionsRepository.create({
      ...createAuctionDto,
      currentPrice: createAuctionDto.startingPrice,
      endDate,
    });

    const savedAuction = await this.auctionsRepository.save(auction);

    return this.toAuctionResponse(savedAuction);
  }

  private toAuctionResponse(auction: Auction): AuctionResponseDto {
    return {
      id: auction.id,
      title: auction.title,
      description: auction.description,
      startingPrice: auction.startingPrice,
      currentPrice: auction.currentPrice,
      endDate: auction.endDate,
      seller: auction.seller,
      createdAt: auction.createdAt,
    };
  }
}
