import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AUCTION_MODEL_NAME, AuctionDocument } from './schemas/auction.schema';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { AuctionResponseDto } from './dto/auction-response.dto';
import { ListAuctionsQueryDto } from './dto/list-auctions-query.dto';
import { RequestUser } from '../auth/types/request-user.type';

@Injectable()
export class AuctionsService {
  constructor(
    @InjectModel(AUCTION_MODEL_NAME)
    private readonly auctionModel: Model<AuctionDocument>,
  ) {}

  async findAll(query: ListAuctionsQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const filter: {
      endDate?: {
        $gte?: Date;
        $lte?: Date;
      };
      currentPrice?: {
        $gte?: number;
        $lte?: number;
      };
    } = {};

    if (query.status === 'open') {
      filter.endDate = { $gte: new Date() };
    }

    if (query.status === 'closed') {
      filter.endDate = { $lte: new Date() };
    }

    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      filter.currentPrice = {};

      if (query.minPrice !== undefined) {
        filter.currentPrice.$gte = query.minPrice;
      }

      if (query.maxPrice !== undefined) {
        filter.currentPrice.$lte = query.maxPrice;
      }
    }

    const auctions = await this.auctionModel
      .find(filter)
      .sort({ endDate: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    const totalItems = await this.auctionModel.countDocuments(filter).exec();

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
    const auction = await this.auctionModel.findById(id).exec();

    if (!auction) {
      throw new NotFoundException('Auction not found');
    }

    return this.toAuctionResponse(auction);
  }

  async create(
    createAuctionDto: CreateAuctionDto,
    currentUser: RequestUser,
  ): Promise<AuctionResponseDto> {
    const endDate =
      createAuctionDto.endDate ??
      new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

    const auction = await this.auctionModel.create({
      ...createAuctionDto,
      currentPrice: createAuctionDto.startingPrice,
      seller: currentUser.username,
      endDate,
    });

    return this.toAuctionResponse(auction);
  }

  private toAuctionResponse(auction: AuctionDocument): AuctionResponseDto {
    return {
      id: auction._id.toString(),
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
