import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from '../entities/tournament.entity';
import { Repository } from 'typeorm';
import { CreateTournamentDto } from '../dto/create-tournament.dto';

@Injectable()
export class CreateTournamentService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentsRepository: Repository<Tournament>,
  ) {}

  async createTournament(
    createTournamentDto: CreateTournamentDto,
  ): Promise<Tournament> {
    const tournament = this.tournamentsRepository.create(createTournamentDto);
    return this.tournamentsRepository.save(tournament);
  }
}
