import { Module } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentController } from './tournament.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { CreateTournamentService } from './services/create-tournament.service';
import { UpdateTournamentService } from './services/update-tournament.service';
import { DeleteToutnamentService } from './services/delete-tournamnet.service';
import { Match } from '../match/entities/match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament, Match])],
  controllers: [TournamentController],
  providers: [
    TournamentService,
    CreateTournamentService,
    UpdateTournamentService,
    DeleteToutnamentService,
  ],
})
export class TournamentModule {}
