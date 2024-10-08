import { Injectable } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { CreateResultService } from './services/create-result.service';

@Injectable()
export class ResultService {
  constructor(private readonly createResultService: CreateResultService) {}
  createResult(createResultDto: CreateResultDto) {
    return this.createResultService.createResult(createResultDto);
  }

  findAllResultsByTournament(tournamentId: number) {
    return this.createResultService.findResultsByTournament(tournamentId);
  }
}
