import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateAuctionDto } from './dto/create-auction.dto';
import { AuctionsService } from './auctions.service';

@Controller('auctions')
export class AuctionsController {
  constructor(private readonly auctionsService: AuctionsService) {}

  @Get()
  findAll() {
    return this.auctionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auctionsService.findOne(id);
  }

  @Post()
  create(@Body() createAuctionDto: CreateAuctionDto) {
    return this.auctionsService.create(createAuctionDto);
  }
}
