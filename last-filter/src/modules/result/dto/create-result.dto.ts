import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResultDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'ID of the match', example: 1 })
  matchId: number;

  @IsOptional()
  @ApiProperty({ description: 'ID of the winner', required: false, example: 2 })
  winnerId?: number;

  @IsOptional()
  @ApiProperty({ description: 'ID of the loser', required: false, example: 3 })
  loserId?: number;

  @IsOptional()
  @IsInt()
  @ApiProperty({
    description: 'Score of the winner',
    required: false,
    example: 10,
  })
  winnerScore?: number;

  @IsOptional()
  @IsInt()
  @ApiProperty({
    description: 'Score of the loser',
    required: false,
    example: 5,
  })
  loserScore?: number;
}
