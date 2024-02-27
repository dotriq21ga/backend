import { Controller, Post, Body, Get, Req, Query, UseGuards } from '@nestjs/common';
import { ChannelUserService } from './channel_user.service';
import { AuthGuard } from 'src/guard/auth/auth.guard';

@Controller('users-of-channel')
@UseGuards(AuthGuard)
export class ChannelUserController {
  constructor(private readonly channelUserService: ChannelUserService) { }

  @Get()
  searchChannel(@Req() request, @Query() query) {
    return this.channelUserService.searchChannelUserNotJoin(query.name, request.user)
  }
}