import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Result } from '../result/entities/result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Match, Result])],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}
