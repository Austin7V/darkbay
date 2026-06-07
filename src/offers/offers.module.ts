import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { OffersService } from './offers.service';
import { Auction } from 'src/auctions/entities/auction.entity';
import { OffersController } from './offers.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Offer, Auction]), AuthModule],
  providers: [OffersService],
  controllers: [OffersController],
})
export class OffersModule {}
