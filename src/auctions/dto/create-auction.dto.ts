import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateAuctionDto {
  @ApiProperty({
    example: 'Gaming Laptop',
    description: 'Title of the auction item.',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    example: 'Used but working laptop.',
    description: 'Detailed description of the item.',
  })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({
    example: 300,
    description: 'Starting price of the auction.',
  })
  @IsNumber()
  @Min(1)
  startingPrice!: number;

  @ApiPropertyOptional({
    example: '2026-06-10T12:00:00.000Z',
    description: 'Optional auction end date in ISO format.',
  })
  @IsOptional()
  @IsDateString()
  endDate?: Date;
}
