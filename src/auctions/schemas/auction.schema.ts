import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export const AUCTION_MODEL_NAME = 'Auction';

export type AuctionDocument = HydratedDocument<Auction> & {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

@Schema({
  timestamps: true,
})
export class Auction {
  @Prop({
    required: true,
  })
  title!: string;

  @Prop({
    required: true,
  })
  description!: string;

  @Prop({
    required: true,
  })
  startingPrice!: number;

  @Prop({
    required: true,
  })
  currentPrice!: number;

  @Prop({
    required: true,
  })
  endDate!: Date;

  @Prop({
    required: true,
  })
  seller!: string;
}

export const AuctionSchema = SchemaFactory.createForClass(Auction);
