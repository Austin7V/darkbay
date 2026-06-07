import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { CreateAuctionDto } from './dto/create-auction.dto';
import { AuctionsService } from './auctions.service';

import { ListAuctionsQueryDto } from './dto/list-auctions-query.dto';

@Controller('auctions')
export class AuctionsController {
  constructor(private readonly auctionsService: AuctionsService) {}

  @Get()
  findAll(@Query() query: ListAuctionsQueryDto) {
    return this.auctionsService.findAll(query);
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
