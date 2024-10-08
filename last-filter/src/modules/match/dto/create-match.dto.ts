import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMatchDto {
  @ApiProperty({ description: 'ID of the tournament', type: Number })
  @IsNumber()
  @IsNotEmpty()
  tournamentId: number;

  @ApiProperty({ description: 'ID of player 1', type: Number })
  @IsNumber()
  @IsNotEmpty()
  player1Id: number;

  @ApiProperty({ description: 'ID of player 2', type: Number })
  @IsNumber()
  @IsNotEmpty()
  player2Id: number;
}
