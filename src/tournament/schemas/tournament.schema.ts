import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { TournamentCategory } from '../constants/enums';

@Schema({ versionKey: false })
export class Tournament {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop()
  location: string;

  @Prop({ required: true, enum: TournamentCategory })
  category: TournamentCategory;

  @Prop({ type: [{ type: String }] })
  participants: string[];

  @Prop({ default: false })
  isCompleted: boolean;
}

export const TournamentSchema: SchemaFactory =
  SchemaFactory.createForClass(Tournament);
