import { Body, Controller, Post } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentDto } from './dto/tournament.dto';
import { Tournament } from './schemas/tournament.schema';

@Controller('tournament')
export class TournamentController {
  constructor(private service: TournamentService) {}

  @Post()
  async create(@Body() tournament: TournamentDto): Promise<Tournament> {
    return this.service.create(tournament);
  }
}
