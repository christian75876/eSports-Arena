import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from '../entities/match.entity';
import { Repository } from 'typeorm';
import { CreateMatchDto } from '../dto/create-match.dto';
import { User } from 'src/modules/auth/entities/user.entity';
import { Tournament } from 'src/modules/tournament/entities/tournament.entity';

@Injectable()
export class CreateMatchService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
  ) {}

  async createMatch(createMatchDto: CreateMatchDto): Promise<Match> {
    const { tournamentId, player1Id, player2Id } = createMatchDto;
    const tournament = await this.tournamentRepository.findOne({
      where: { id: tournamentId },
    });

    if (!tournament) {
      throw new NotFoundException('Invalid tournament.');
    }

    const player1 = await this.userRepository.findOne({
      where: { id: player1Id },
    });
    const player2 = await this.userRepository.findOne({
      where: { id: player2Id },
    });

    if (!tournament || !player1 || !player2) {
      throw new Error('Invalid tournament, player1 or player2.');
    }

    const match = this.matchRepository.create({
      tournament,
      player1,
      player2,
      scheduledAt: new Date(),
    });
    return await this.matchRepository.save(match);
  }

  async generateMatchesForTournament(tournamentId: number): Promise<Match[]> {
    const users = await this.userRepository.find({
      where: { role_id: 2 },
    });

    const tournament = await this.tournamentRepository.findOne({
      where: { id: tournamentId },
    });

    if (!tournament) {
      throw new Error('Tournament not found.');
    }

    if (users.length < 2)
      throw new Error('Not enough players to generate matches.');

    const matches: Match[] = [];
    for (let i = 0; i < users.length; i += 2) {
      if (i + 1 < users.length) {
        const createMatchDto: CreateMatchDto = {
          tournamentId: tournament.id,
          player1Id: users[i].id,
          player2Id: users[i + 1].id,
        };

        const match = await this.createMatch(createMatchDto);
        matches.push(match);
      }
    }

    console.log('Matches generated successfully:', matches);
    return matches;
  }
}
