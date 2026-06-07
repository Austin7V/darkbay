import { Body, Controller, Param, Post } from '@nestjs/common';

import { CreateOfferDto } from './dto/create-offer.dto';
import { OffersService } from './offers.service';

@Controller('auctions/:auctionId/offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(
    @Param('auctionId') auctionId: string,

    @Body() createOfferDto: CreateOfferDto,
  ) {
    return this.offersService.create(auctionId, createOfferDto);
  }
}
