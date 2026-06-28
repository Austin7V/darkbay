import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AUCTION_MODEL_NAME, AuctionSchema } from './schemas/auction.schema';
import { AuctionsController } from './auctions.controller';
import { AuctionsService } from './auctions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AUCTION_MODEL_NAME,
        schema: AuctionSchema,
      },
    ]),
  ],
  controllers: [AuctionsController],
  providers: [AuctionsService],
  exports: [AuctionsService],
})
export class AuctionsModule {}
