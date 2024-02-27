import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/database';
import { UserModule } from './user/user.module';
import { SeedService } from './seed/seed.service';
import { JwtModule } from '@nestjs/jwt';
import { CONFIG_JWT } from './config/jwt';
import { ChannelModule } from './channel/channel.module';
import { ChannelUserModule } from './channel_user/channel_user.module';
import { MessageModule } from './message/message.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    JwtModule.register(CONFIG_JWT),
    UserModule,
    AuthModule,
    ChannelModule,
    ChannelUserModule,
    MessageModule,
    ChatModule
  ],
  providers: [SeedService],
})

export class AppModule {
  constructor() { }
}
