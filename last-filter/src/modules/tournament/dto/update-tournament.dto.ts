import { PartialType } from '@nestjs/mapped-types';
import { CreateTournamentDto } from './create-tournament.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTournamentDto extends PartialType(CreateTournamentDto) {
  @ApiProperty({ description: 'Name of the tournament', required: false })
  name?: string;

  @ApiProperty({
    description: 'Start date of the tournament in ISO format',
    required: false,
  })
  startDate?: Date;

  @ApiProperty({
    description: 'End date of the tournament in ISO format',
    required: false,
  })
  endDate?: Date;

  @ApiProperty({
    description: 'Description of the tournament',
    required: false,
  })
  description?: string;
}
