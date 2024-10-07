import { Module } from '@nestjs/common';
import { ParticipationService } from './participation.service';
import { ParticipationController } from './participation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participation } from './entities/participation.entity';
import { Tournament } from '../tournament/entities/tournament.entity';
import { User } from '../auth/entities/user.entity';
import { CreateParticipationService } from './services/create-participation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Participation, Tournament, User])],
  controllers: [ParticipationController],
  providers: [ParticipationService, CreateParticipationService],
})
export class ParticipationModule {}
