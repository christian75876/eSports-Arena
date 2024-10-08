import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTournamentDto {
  @ApiProperty({ description: 'Name of the tournament' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Start date of the tournament in ISO format' })
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @ApiProperty({ description: 'End date of the tournament in ISO format' })
  @IsNotEmpty()
  @IsDateString()
  endDate: Date;

  @ApiProperty({
    description: 'Description of the tournament',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
