import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { CreateTournamentService } from './services/create-tournament.service';
import { UpdateTournamentService } from './services/update-tournament.service';
import { DeleteToutnamentService } from './services/delete-tournamnet.service';
import { Tournament } from './entities/tournament.entity';

@Injectable()
export class TournamentService {
  constructor(
    private readonly createRournamentService: CreateTournamentService,
    private readonly updateTournamentService: UpdateTournamentService,
    private readonly deleteToutnamentService: DeleteToutnamentService,
  ) {}

  async createTournament(
    createTournamentDto: CreateTournamentDto,
  ): Promise<Tournament> {
    return this.createRournamentService.createTournament(createTournamentDto);
  }
  async updateTournament(
    id: number,
    updateTournamentDto: UpdateTournamentDto,
  ): Promise<Tournament> {
    return this.updateTournamentService.updateTournament(
      id,
      updateTournamentDto,
    );
  }
  async deleteTournament(id: number): Promise<{ message: string }> {
    return this.deleteToutnamentService.deleteTournament(id);
  }
}
