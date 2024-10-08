import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ResultService } from './result.service';
import { CreateResultDto } from './dto/create-result.dto';

@Controller('results')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post()
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultService.createResult(createResultDto);
  }

  @Get('tournaments/:id')
  findTournament(@Param('id') id: number) {
    return this.resultService.findAllResultsByTournament(id);
  }
}
