import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export const OFFER_MODEL_NAME = 'Offer';

export type OfferDocument = HydratedDocument<Offer> & {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

@Schema({
  timestamps: true,
})
export class Offer {
  @Prop({
    required: true,
  })
  amount!: number;

  @Prop({
    required: true,
  })
  bidder!: string;

  @Prop({
    required: true,
  })
  auctionId!: string;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
