import { Injectable } from '@nestjs/common';
import { Tournament } from './schemas/tournament.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TournamentDto } from './dto/tournament.dto';

@Injectable()
export class TournamentService {
  constructor(
    @InjectModel(Tournament.name) private tournamentModel: Model<Tournament>
  ) {}

  async create(tournamentDto: TournamentDto): Promise<Tournament> {
    const tournament = new this.tournamentModel(tournamentDto);
    return tournament.save();
  }
}
