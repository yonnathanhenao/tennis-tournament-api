import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  birthDate: Date;

  @Prop()
  address: string;

  @Prop({ default: false })
  isAdmin: boolean;
}

export const UserSchema: SchemaFactory = SchemaFactory.createForClass(User);
