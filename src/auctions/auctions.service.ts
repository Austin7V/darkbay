import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOptionsWhere,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';

import { CreateAuctionDto } from './dto/create-auction.dto';
import { Auction } from './entities/auction.entity';
import { AuctionResponseDto } from './dto/auction-response.dto';
import { ListAuctionsQueryDto } from './dto/list-auctions-query.dto';

@Injectable()
export class AuctionsService {
  constructor(
    @InjectRepository(Auction)
    private readonly auctionsRepository: Repository<Auction>,
  ) {}

  async findAll(query: ListAuctionsQueryDto) {
    const page = query.page ?? 1;

    const limit = query.limit ?? 10;

    const skip = (page - 1) * limit;

    const where: FindOptionsWhere<Auction> = {};

    if (query.status === 'open') {
      where.endDate = MoreThanOrEqual(new Date());
    }

    if (query.status === 'closed') {
      where.endDate = LessThanOrEqual(new Date());
    }

    if (query.minPrice !== undefined) {
      where.currentPrice = MoreThanOrEqual(query.minPrice);
    }

    if (query.maxPrice !== undefined) {
      where.currentPrice = LessThanOrEqual(query.maxPrice);
    }

    const [auctions, totalItems] = await this.auctionsRepository.findAndCount({
      where,
      skip,
      take: limit,

      order: {
        endDate: 'DESC',
      },
    });

    const items = auctions.map((auction) => this.toAuctionResponse(auction));

    const totalPages = Math.ceil(totalItems / limit);

    return {
      items,
      meta: {
        totalItems,
        totalPages,
        currentPage: page,
        limit,
      },
    };
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
