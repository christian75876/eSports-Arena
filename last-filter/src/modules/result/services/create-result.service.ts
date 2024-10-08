import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from '../entities/result.entity';
import { Repository } from 'typeorm';
import { CreateResultDto } from '../dto/create-result.dto';
import { Match } from 'src/modules/match/entities/match.entity';
import { User } from 'src/modules/auth/entities/user.entity';

@Injectable()
export class CreateResultService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createResult(createResultDto: CreateResultDto): Promise<Result> {
    const match = await this.matchRepository.findOne({
      where: { id: createResultDto.matchId },
      relations: ['player1', 'player2'],
    });

    if (!match) {
      throw new Error(`Match with id ${createResultDto.matchId} not found.`);
    }

    let winner: User;
    let loser: User;

    if (createResultDto.winnerId && createResultDto.loserId) {
      winner = await this.userRepository.findOne({
        where: { id: createResultDto.winnerId },
      });
      loser = await this.userRepository.findOne({
        where: { id: createResultDto.loserId },
      });

      if (!winner || !loser) {
        throw new Error('Winner or loser user not found.');
      }
    } else {
      const players = [match.player1, match.player2];
      const randomIndex = Math.floor(Math.random() * players.length);

      winner = players[randomIndex];
      loser = players[randomIndex === 0 ? 1 : 0];

      createResultDto.winnerScore = Math.floor(Math.random() * 10) + 1;
      createResultDto.loserScore =
        Math.floor(Math.random() * (createResultDto.winnerScore - 1)) + 1;
    }

    const result = this.resultRepository.create({
      match,
      winner,
      loser,
      winnerScore: createResultDto.winnerScore,
      loserScore: createResultDto.loserScore,
    });

    return this.resultRepository.save(result);
  }

  async findResultsByTournament(tournamentId: number): Promise<Result[]> {
    const matches = await this.matchRepository.find({
      where: { tournament: { id: tournamentId } },
      relations: ['results'],
    });

    const results = matches.flatMap(match => match.results);
    return results;
  }
}
