import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'sergey',
    description: 'Username of the new user.',
  })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty({
    example: '123456',
    description: 'Password of the new user. Must be at least 6 characters.',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}
