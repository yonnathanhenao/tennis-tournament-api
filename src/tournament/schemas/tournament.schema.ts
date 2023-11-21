import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Tournament>;

enum TournamentCategory {
  INDIVUDUAL_MALE,
  INDIVIDUAL_FEMALE,
  DOUBLES_MALE,
  DOUBLES_FEMALE
}

@Schema()
export class Tournament {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop()
  location: string;

  @Prop({
    required: true
  })
  category: TournamentCategory;

  @Prop({ type: [{ type: String }] })
  participants: string[];

  @Prop({ default: false })
  isCompleted: boolean;
}

export const TournamentSchema = SchemaFactory.createForClass(Tournament);
