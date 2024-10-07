import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';

@Controller('tournaments')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Post()
  create(@Body() createTournamentDto: CreateTournamentDto) {
    return this.tournamentService.createTournament(createTournamentDto);
  }

  @Post(':id')
  update(
    @Param('id') id: number,
    @Body() updateTournamentDto: UpdateTournamentDto,
  ) {
    return this.tournamentService.updateTournament(id, updateTournamentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tournamentService.deleteTournament(id);
  }
}
