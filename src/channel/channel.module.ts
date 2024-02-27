import { Module, forwardRef } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { Channel } from './entities/channel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelUserModule } from 'src/channel_user/channel_user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Channel]), forwardRef(() => ChannelUserModule)],
  controllers: [ChannelController],
  providers: [ChannelService],
  exports: [ChannelService]
})

export class ChannelModule { }