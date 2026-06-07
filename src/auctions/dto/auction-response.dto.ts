export class AuctionResponseDto {
  id!: string;

  title!: string;

  description!: string;

  startingPrice!: number;

  currentPrice!: number;

  endDate!: Date;

  seller!: string;

  createdAt!: Date;
}
