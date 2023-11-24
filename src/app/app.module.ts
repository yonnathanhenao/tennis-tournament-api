import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from 'src/user/user.module';
import { TournamentModule } from '../tournament/tournament.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    TournamentModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
