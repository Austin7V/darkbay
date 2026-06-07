import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { RequestUser } from '../auth/types/request-user.type';

import { CreateAuctionDto } from './dto/create-auction.dto';
import { AuctionsService } from './auctions.service';

import { ListAuctionsQueryDto } from './dto/list-auctions-query.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createAuctionDto: CreateAuctionDto,
    @Req() request: Request & { user: RequestUser },
  ) {
    return this.auctionsService.create(createAuctionDto, request.user);
  }
}
