import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from '../entities/tournament.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteToutnamentService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
  ) {}

  async deleteTournament(id: number): Promise<{ message: string }> {
    const result = this.tournamentRepository.softDelete(id);
    if ((await result).affected === 0) {
      throw new Error(`Tournament with ID ${id} not found`);
    }

    return {
      message: `Tournament with ID ${id} has been deleted successfully`,
    };
  }
}
