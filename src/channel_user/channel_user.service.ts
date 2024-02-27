import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ChannelUser } from './entities/channel_user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { handleErrorEmptyArray } from 'src/utils/util';
import { ChannelService } from 'src/channel/channel.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ChannelUserService {
  constructor(
    @InjectRepository(ChannelUser)
    private readonly channelUserRepository: Repository<ChannelUser>,
    @Inject(forwardRef(() => ChannelService))
    private channelService: ChannelService,
  ) { }

  async joinChannel(channelId: string, userId: string, isAdmin: boolean) {
    try {
      const userHaveJoinChannel = await this.channelUserRepository.findOne({ where: { channelId: channelId, userId: userId } });
      if (userHaveJoinChannel) throw Error
      const channel = await this.channelUserRepository.save({
        id: uuidv4(),
        channelId: channelId,
        userId: userId,
        isAdmin
      });
      return channel
    } catch (error) {
      throw error
    }
  }

  async searchChannelUserNotJoin(name: string, user: User) {
    const handleName = name.trim();
    try {
      if (handleName) {
        const channels = await this.channelUserRepository.createQueryBuilder('channelUser')
          .innerJoinAndSelect("channelUser.channel", 'channel')
          .where('channelUser.userId != :userId ', { userId: user.id })
          .andWhere('channel.name ILIKE :name', { name: `%${handleName}%` })
          .getMany()
          .then(channelUsers => channelUsers.map((channelUser) => channelUser.channel.id));
        const channelsOfUser = await this.channelService.getChannelOfUser(user.id);
        const listChannelUserNotJoin = channels.filter((channelId) => {
          return !channelsOfUser.some((c) => c.id === channelId)
        })
        const uniqueChannelIds = new Set(listChannelUserNotJoin);
        const uniqueChannelIdsConvert = handleErrorEmptyArray(Array.from(uniqueChannelIds));
        if (uniqueChannelIdsConvert) {
          return this.channelService.getChannels(uniqueChannelIdsConvert)
        }
      }
      return []
    } catch (error) {
      throw error
    }
  }

  async findChanelOfUser(userId: string) {
    try {
      return await this.channelUserRepository.find({ where: { userId } });
    } catch (error) {
      throw error
    }
  }
}