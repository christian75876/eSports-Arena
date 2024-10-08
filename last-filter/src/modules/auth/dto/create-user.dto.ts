import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'The email of the user' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The password of the user' })
  @IsString()
  @IsNotEmpty()
  @MinLength(7, { message: 'must be at least 7 characters long' })
  @MaxLength(20, { message: 'must be at most 20 character long' })
  @IsStrongPassword()
  password: string;
}
