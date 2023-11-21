import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TournamentModule } from './tournament/tournament.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://devyhenao:xDbgbwxRsL5DDh34@tennisapp.jdqklbj.mongodb.net/tennis-tournament-db?retryWrites=true&w=majority'
    ),
    TournamentModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
