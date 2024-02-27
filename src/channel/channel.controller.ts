import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { AuthGuard } from 'src/guard/auth/auth.guard';

@Controller('channel')
@UseGuards(AuthGuard)
export class ChannelController {
  constructor(private readonly channelService: ChannelService) { }

  @Get()
  get(@Req() request) {
    return this.channelService.getChannelOfUser(request.user.id);
  }
}
