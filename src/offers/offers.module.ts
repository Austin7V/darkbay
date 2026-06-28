import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  AUCTION_MODEL_NAME,
  AuctionSchema,
} from '../auctions/schemas/auction.schema';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { OFFER_MODEL_NAME, OfferSchema } from './schemas/offer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OFFER_MODEL_NAME,
        schema: OfferSchema,
      },
      {
        name: AUCTION_MODEL_NAME,
        schema: AuctionSchema,
      },
    ]),
  ],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
