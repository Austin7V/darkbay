import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CreateAuctionDto } from './dto/create-auction.dto';
import { AuctionsService } from './auctions.service';

import { ListAuctionsQueryDto } from './dto/list-auctions-query.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAuctionDto: CreateAuctionDto) {
    return this.auctionsService.create(createAuctionDto);
  }
}
