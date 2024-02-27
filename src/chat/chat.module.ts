import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { MessageModule } from 'src/message/message.module';
import { ChannelModule } from 'src/channel/channel.module';
import { ChannelUserModule } from 'src/channel_user/channel_user.module';

@Module({
  imports: [MessageModule, ChannelModule, ChannelUserModule],
  providers: [ChatGateway, ChatService],
})

export class ChatModule { }