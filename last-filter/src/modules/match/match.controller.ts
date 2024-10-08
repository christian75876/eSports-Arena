import { Controller, Post, Body, Param } from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';

@Controller('matches')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  create(@Body() createMatchDto: CreateMatchDto) {
    return this.matchService.createMatch(createMatchDto);
  }

  @Post('tournament/:id/generate')
  generateMatchesForTournament(@Param('id') tournamentId: number) {
    return this.matchService.generateMatchesForTournament(tournamentId);
  }
}
