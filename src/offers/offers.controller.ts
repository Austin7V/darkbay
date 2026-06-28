import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';

import { CreateOfferDto } from './dto/create-offer.dto';
import { OffersService } from './offers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { RequestUser } from '../auth/types/request-user.type';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Offers')
@Controller('auctions/:auctionId/offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @ApiOperation({ summary: 'Get all offers for one auction' })
  @Get()
  findAllForAuction(@Param('auctionId') auctionId: string) {
    return this.offersService.findAllForAuction(auctionId);
  }

  @ApiOperation({ summary: 'Place an offer on an auction' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Param('auctionId') auctionId: string,
    @Body() createOfferDto: CreateOfferDto,
    @Req() request: Request & { user: RequestUser },
  ) {
    return this.offersService.create(auctionId, createOfferDto, request.user);
  }
}
