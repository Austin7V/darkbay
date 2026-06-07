import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class CreateOfferDto {
  @ApiProperty({
    example: 450,
    description: 'Offer amount. Must be higher than the current auction price.',
  })
  @IsNumber()
  @Min(1)
  amount!: number;
}
