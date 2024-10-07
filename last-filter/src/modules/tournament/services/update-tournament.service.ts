import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from '../entities/tournament.entity';
import { Repository } from 'typeorm';
import { UpdateTournamentDto } from '../dto/update-tournament.dto';

@Injectable()
export class UpdateTournamentService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
  ) {}

  async updateTournament(
    id: number,
    updateTournamentDto: UpdateTournamentDto,
  ): Promise<Tournament> {
    const tournament = await this.tournamentRepository.findOne({
      where: { id },
    });
    if (!tournament) {
      throw new Error(`Tournament with id ${id} not found.`);
    }
    Object.assign(tournament, updateTournamentDto);
    return await this.tournamentRepository.save(tournament);
  }
}
