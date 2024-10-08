import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Result } from '../result/entities/result.entity';
import { User } from '../auth/entities/user.entity';
import { Tournament } from '../tournament/entities/tournament.entity';
import { CreateMatchService } from './services/create-match.service';

@Module({
  imports: [TypeOrmModule.forFeature([Match, Result, User, Tournament])],
  controllers: [MatchController],
  providers: [MatchService, CreateMatchService],
})
export class MatchModule {}
