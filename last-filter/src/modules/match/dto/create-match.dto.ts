import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMatchDto {
  @IsNumber()
  @IsNotEmpty()
  tournamentId: number;

  @IsNumber()
  @IsNotEmpty()
  player1Id: number;

  @IsNumber()
  @IsNotEmpty()
  player2Id: number;
}
