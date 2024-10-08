import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from '../match/entities/match.entity';
import { Result } from './entities/result.entity';
import { CreateResultService } from './services/create-result.service';
import { User } from '../auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Result, Match, User])],
  controllers: [ResultController],
  providers: [ResultService, CreateResultService],
})
export class ResultModule {}
