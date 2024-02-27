import { Module, forwardRef } from '@nestjs/common';
import { ChannelUserService } from './channel_user.service';
import { ChannelUserController } from './channel_user.controller';
import { ChannelUser } from './entities/channel_user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelModule } from 'src/channel/channel.module';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelUser]), forwardRef(() => ChannelModule)],
  controllers: [ChannelUserController],
  providers: [ChannelUserService],
  exports: [ChannelUserService]
})

export class ChannelUserModule { }