import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateParticipationDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  tournamentId: number;
}
