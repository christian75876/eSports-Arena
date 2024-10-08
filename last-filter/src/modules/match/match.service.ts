import { Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { CreateMatchService } from './services/create-match.service';

@Injectable()
export class MatchService {
  constructor(private readonly createMatchService: CreateMatchService) {}
  createMatch(createMatchDto: CreateMatchDto) {
    return this.createMatchService.createMatch(createMatchDto);
  }

  generateMatchesForTournament(tournamentId: number) {
    return this.createMatchService.generateMatchesForTournament(tournamentId);
  }
}
