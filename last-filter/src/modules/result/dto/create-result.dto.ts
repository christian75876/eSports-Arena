import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateResultDto {
  @IsNotEmpty()
  matchId: number;

  @IsOptional()
  winnerId?: number;

  @IsOptional()
  loserId?: number;

  @IsOptional()
  @IsInt()
  winnerScore?: number;

  @IsOptional()
  @IsInt()
  loserScore?: number;
}
