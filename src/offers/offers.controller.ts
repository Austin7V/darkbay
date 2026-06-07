import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { CreateOfferDto } from './dto/create-offer.dto';
import { OffersService } from './offers.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('auctions/:auctionId/offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get()
  findAllForAuction(@Param('auctionId') auctionId: string) {
    return this.offersService.findAllForAuction(auctionId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Param('auctionId') auctionId: string,

    @Body() createOfferDto: CreateOfferDto,
  ) {
    return this.offersService.create(auctionId, createOfferDto);
  }
}
