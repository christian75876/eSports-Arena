import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from '../common/config';
import { TournamentModule } from './tournament/tournament.module';
import { ParticipationModule } from './participation/participation.module';
import { MatchModule } from './match/match.module';
import { ResultModule } from './result/result.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
    TournamentModule,
    ParticipationModule,
    MatchModule,
    ResultModule,
  ],
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService],
})
export class DatabaseModule {}
