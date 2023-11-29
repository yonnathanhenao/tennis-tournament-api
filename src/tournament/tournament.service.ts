import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TournamentDocument } from './constants/types';
import { TournamentDto } from './dto/tournament.dto';
import { Tournament } from './schemas/tournament.schema';

@Injectable()
export class TournamentService {
  constructor(
    @InjectModel(Tournament.name) private tournamentModel: Model<Tournament>
  ) {}

  async create(tournamentDto: TournamentDto): Promise<Tournament> {
    const createdTournament: TournamentDocument = new this.tournamentModel(
      tournamentDto
    );
    return createdTournament.save();
  }

  async findAll(): Promise<Tournament[]> {
    const tournaments: Tournament[] = await this.tournamentModel.find();
    return tournaments || [];
  }

  async findOne(id: string): Promise<Tournament | null> {
    const tournament: Tournament = await this.tournamentModel.findById(id);
    return tournament ?? null;
  }

  async update(id: string, tournament: TournamentDto): Promise<Tournament> {
    const updatedTournament: TournamentDocument =
      await this.tournamentModel.findByIdAndUpdate(id, tournament, {
        new: true
      });
    if (!updatedTournament) {
      throw new NotFoundException(`Tournament ${id} not found`);
    }
    return updatedTournament;
  }

  async delete(id: string): Promise<Tournament> {
    const deletedTournament: TournamentDocument =
      await this.tournamentModel.findByIdAndDelete(id);
    if (!deletedTournament) {
      throw new NotFoundException(`Tournament ${id} not found`);
    }
    return deletedTournament;
  }
}
