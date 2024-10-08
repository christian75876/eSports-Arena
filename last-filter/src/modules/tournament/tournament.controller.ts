import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiPostOperation } from 'src/common/decorators/swagger';

@ApiTags('tournaments')
@Controller('tournaments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @ApiPostOperation(
    '/tournaments',
    CreateTournamentDto,
    CreateTournamentDto,
    true,
  )
  @Post()
  create(@Body() createTournamentDto: CreateTournamentDto) {
    return this.tournamentService.createTournament(createTournamentDto);
  }

  @ApiOperation({ summary: 'Update an existing tournament' })
  @ApiResponse({ status: 200, description: 'Tournament updated successfully.' })
  @ApiResponse({ status: 404, description: 'Tournament not found.' })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateTournamentDto: UpdateTournamentDto,
  ) {
    return this.tournamentService.updateTournament(id, updateTournamentDto);
  }

  @ApiOperation({ summary: 'Delete a tournament' })
  @ApiResponse({ status: 200, description: 'Tournament deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Tournament not found.' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tournamentService.deleteTournament(id);
  }
}
