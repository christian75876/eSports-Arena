import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participation } from 'src/modules/participation/entities/participation.entity';
import { User } from 'src/modules/auth/entities/user.entity';
import { Tournament } from 'src/modules/tournament/entities/tournament.entity';

@Injectable()
export class ParticipationServiceInTournament {
  constructor(
    @InjectRepository(Participation)
    private readonly participationRepository: Repository<Participation>,
  ) {}

  async registerUserInTournament(
    userId: number,
    tournamentId: number,
  ): Promise<Participation> {
    const existingParticipation = await this.participationRepository.findOne({
      where: { user: { id: userId }, tournament: { id: tournamentId } },
    });

    if (existingParticipation) {
      console.log(
        `User ${userId} is already registered in tournament ${tournamentId}.`,
      );
      return existingParticipation;
    }

    const participation = this.participationRepository.create({
      user: { id: userId } as User,
      tournament: { id: tournamentId } as Tournament,
      registeredAt: new Date(),
    });

    return await this.participationRepository.save(participation);
  }
}
