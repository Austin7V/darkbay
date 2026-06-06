import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateAuctionDto } from './dto/create-auction.dto';
import { AuctionsService } from './auctions.service';

@Controller('auctions')
export class AuctionsController {
  constructor(private readonly auctionsService: AuctionsService) {}

  @Get()
  findAll() {
    return this.auctionsService.findAll();
  }

  @Post()
  create(@Body() createAuctionDto: CreateAuctionDto) {
    return this.auctionsService.create(createAuctionDto);
  }
}
