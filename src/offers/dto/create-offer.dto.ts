import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateOfferDto {
  @IsNumber()
  @Min(1)
  amount!: number;

  @IsString()
  @IsNotEmpty()
  bidder!: string;
}
