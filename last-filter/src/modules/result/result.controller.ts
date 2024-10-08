import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { ResultService } from './result.service';
import { CreateResultDto } from './dto/create-result.dto';
import { ApiPostOperation } from 'src/common/decorators/swagger';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@ApiTags('result')
@Controller('results')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @ApiPostOperation('/results', CreateResultDto, CreateResultDto, true)
  @Post()
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultService.createResult(createResultDto);
  }

  @ApiOperation({ summary: 'Get all results for a specific tournament' })
  @ApiResponse({
    status: 200,
    description: 'List of results for the tournament.',
  })
  @ApiResponse({ status: 404, description: 'Tournament not found.' })
  @Get('tournaments/:id')
  findTournament(@Param('id') id: number) {
    return this.resultService.findAllResultsByTournament(id);
  }
}
