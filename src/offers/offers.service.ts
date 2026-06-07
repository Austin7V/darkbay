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
import { OfferResponseDto } from './dto/offer-response.dto';
import { RequestUser } from '../auth/types/request-user.type';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,

    @InjectRepository(Auction)
    private readonly auctionsRepository: Repository<Auction>,
  ) {}

  private toOfferResponse(offer: Offer): OfferResponseDto {
    return {
      id: offer.id,
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
      amount: createOfferDto.amount,
      bidder: currentUser.username,
      auction,
    });

    auction.currentPrice = createOfferDto.amount;

    await this.auctionsRepository.save(auction);

    const savedOffer = await this.offersRepository.save(offer);

    return this.toOfferResponse(savedOffer);
  }

  async findAllForAuction(auctionId: string): Promise<OfferResponseDto[]> {
    const auction = await this.auctionsRepository.findOne({
      where: { id: auctionId },
    });

    if (!auction) {
      throw new NotFoundException('Auction not found');
    }

    const offers = await this.offersRepository.find({
      where: {
        auction: { id: auctionId },
      },
      order: {
        createdAt: 'DESC',
      },
    });

    return offers.map((offer) => this.toOfferResponse(offer));
  }
}
