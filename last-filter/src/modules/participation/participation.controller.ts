import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ParticipationService } from './participation.service';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('participations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ParticipationController {
  constructor(private readonly participationService: ParticipationService) {}

  @Post()
  @Roles(2)
  createParticipation(@Body() createParticipationDto: CreateParticipationDto) {
    return this.participationService.createParticipation(
      createParticipationDto,
    );
  }
}
