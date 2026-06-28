import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  AUCTION_MODEL_NAME,
  AuctionDocument,
} from '../auctions/schemas/auction.schema';
import { RequestUser } from '../auth/types/request-user.type';
import { CreateOfferDto } from './dto/create-offer.dto';
import { OfferResponseDto } from './dto/offer-response.dto';
import { OFFER_MODEL_NAME, OfferDocument } from './schemas/offer.schema';

@Injectable()
export class OffersService {
  constructor(
    @InjectModel(OFFER_MODEL_NAME)
    private readonly offerModel: Model<OfferDocument>,

    @InjectModel(AUCTION_MODEL_NAME)
    private readonly auctionModel: Model<AuctionDocument>,
  ) {}

  private toOfferResponse(offer: OfferDocument): OfferResponseDto {
    return {
      id: offer._id.toString(),
      amount: offer.amount,
      bidder: offer.bidder,
      createdAt: offer.createdAt,
    };
  }

  async create(
    auctionId: string,
    createOfferDto: CreateOfferDto,
    currentUser: RequestUser,
  ): Promise<OfferResponseDto> {
    const auction = await this.auctionModel.findById(auctionId).exec();

    if (!auction) {
      throw new NotFoundException('Auction not found');
    }

    if (auction.endDate < new Date()) {
      throw new ConflictException('Auction is already closed');
    }

    if (auction.seller === currentUser.username) {
      throw new ConflictException('You cannot bid on your own auction');
    }

    if (createOfferDto.amount <= auction.currentPrice) {
      throw new ConflictException('Offer must be higher than current price');
    }

    auction.currentPrice = createOfferDto.amount;

    await auction.save();

    const offer = await this.offerModel.create({
      amount: createOfferDto.amount,
      bidder: currentUser.username,
      auctionId,
    });

    return this.toOfferResponse(offer);
  }

  async findAllForAuction(auctionId: string): Promise<OfferResponseDto[]> {
    const auction = await this.auctionModel.findById(auctionId).exec();

    if (!auction) {
      throw new NotFoundException('Auction not found');
    }

    const offers = await this.offerModel
      .find({ auctionId })
      .sort({ createdAt: -1 })
      .exec();

    return offers.map((offer) => this.toOfferResponse(offer));
  }
}
