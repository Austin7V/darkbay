export class CreateAuctionDto {
  title: string;
  description: string;
  startingPrice: number;
  sellet: string;
  endDate?: Date;
}
