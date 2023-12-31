import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res
} from '@nestjs/common';

import { TournamentDto } from './dto/tournament.dto';
import { Tournament } from './schemas/tournament.schema';
import { TournamentService } from './tournament.service';
import { Admin } from 'src/user/decorators/roles.decorators';

@Controller('tournament')
@Admin()
export class TournamentController {
  constructor(private readonly service: TournamentService) {}

  @Post()
  async create(@Body() tournament: TournamentDto): Promise<Tournament> {
    return await this.service.create(tournament);
  }

  @Get()
  async findAll(@Res() response): Promise<Tournament[]> {
    const data: Tournament[] = await this.service.findAll();
    return response.status(HttpStatus.OK).json({ data });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response): Promise<Tournament> {
    const data: Tournament = await this.service.findOne(id);
    return response.status(HttpStatus.OK).json(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() tournament: TournamentDto
  ): Promise<Tournament> {
    const data: Tournament = await this.service.update(id, tournament);
    return data;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Tournament> {
    const data: Tournament = await this.service.delete(id);
    return data;
  }
}
