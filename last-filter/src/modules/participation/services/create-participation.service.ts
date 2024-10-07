import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participation } from '../entities/participation.entity';
import { Repository } from 'typeorm';
import { CreateParticipationDto } from '../dto/create-participation.dto';
import { Tournament } from 'src/modules/tournament/entities/tournament.entity';
import { User } from 'src/modules/auth/entities/user.entity';

@Injectable()
export class CreateParticipationService {
  constructor(
    @InjectRepository(Participation)
    private readonly participationRepository: Repository<Participation>,
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createParticipation(
    createParticipationDto: CreateParticipationDto,
  ): Promise<Participation> {
    const { userId, tournamentId } = createParticipationDto;

    const tournament = await this.tournamentRepository.findOne({
      where: { id: tournamentId },
    });
    if (!tournament) {
      throw new NotFoundException(
        `Tournament with ID ${tournamentId} not found`,
      );
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const existingParticipation = await this.participationRepository.findOne({
      where: { tournament, user },
    });

    if (existingParticipation) {
      throw new Error('User is already participating in the tournament');
    }

    const newParticipation = this.participationRepository.create({
      user,
      tournament,
      registeredAt: new Date(),
    });

    return await this.participationRepository.save(newParticipation);
  }
}
