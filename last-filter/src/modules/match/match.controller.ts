import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiPostOperation } from 'src/common/decorators/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('matches')
@Controller('matches')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @ApiPostOperation('/match', CreateMatchDto, CreateMatchDto, true)
  @Post()
  create(@Body() createMatchDto: CreateMatchDto) {
    return this.matchService.createMatch(createMatchDto);
  }

  @Roles(1)
  @ApiOperation({ summary: 'Generate matches for a specific tournament' })
  @ApiResponse({ status: 200, description: 'Matches generated successfully.' })
  @ApiResponse({ status: 404, description: 'Tournament not found.' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the tournament to generate matches for',
    type: Number,
  })
  @Post('tournament/:id/generate')
  generateMatchesForTournament(@Param('id') tournamentId: number) {
    return this.matchService.generateMatchesForTournament(tournamentId);
  }
}
