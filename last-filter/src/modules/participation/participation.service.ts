import { Injectable } from '@nestjs/common';
import { CreateParticipationService } from './services/create-participation.service';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { Participation } from './entities/participation.entity';

@Injectable()
export class ParticipationService {
  constructor(
    private readonly createParticipationService: CreateParticipationService,
  ) {}

  async createParticipation(
    createParticipationDto: CreateParticipationDto,
  ): Promise<Participation> {
    return this.createParticipationService.createParticipation(
      createParticipationDto,
    );
  }
}
