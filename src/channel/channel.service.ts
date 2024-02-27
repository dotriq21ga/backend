import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from './entities/channel.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ChannelUserService } from 'src/channel_user/channel_user.service';
import { CreateChannelPayload } from './channel.model';

@Injectable()
export class ChannelService {

  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
    @Inject(forwardRef(() => ChannelUserService))
    private channelUserService: ChannelUserService,
  ) { }

  async create(payload: CreateChannelPayload) {
    try {
      const isAdmin = true;
      const channel = await this.channelRepository.save({
        id: uuidv4(),
        description: payload.description,
        name: payload.name
      })
      await this.channelUserService.joinChannel(channel.id, payload.ownerId, isAdmin)
      return channel;
    } catch (error) {
      throw error
    }
  }

  async getChannelOfUser(userId: string) {
    try {
      return await this.channelRepository.createQueryBuilder('channel')
        .innerJoin("channel.channelUser", 'channelUser')
        .leftJoinAndSelect('channel.message', 'message')
        .orderBy('message.send_at', 'DESC')
        .where('channelUser.userId = :userId', { userId })
        .getMany()
        .then((datas) => datas.map(data => {
          data.message = data.message[0] ? [data.message[0]] : [];
          return data
        }))
    } catch (error) {
      throw error
    }
  }

  async getChannels(ids: string[]) {
    try {
      return await this.channelRepository.createQueryBuilder('channel')
        .where('channel.id IN (:...ids)', { ids })
        .getMany()
    } catch (error) {
      throw error
    }
  }

  async getChannelMessages(channelId: string) {
    try {
      const channelMessages = await this.channelRepository.createQueryBuilder('channel')
        .leftJoinAndSelect('channel.message', 'message')
        .leftJoinAndSelect('message.user', 'user')
        .innerJoin('channel.channelUser', 'channelUser')
        .loadRelationCountAndMap('channel.totalUser', 'channel.channelUser')
        .orderBy('message.send_at', 'DESC')
        .where("channel.id = :channelId", { channelId })
        .getOneOrFail();
      channelMessages.message.reverse();
      return channelMessages
    } catch (error) {
      throw error
    }
  }

  async channelExists(channelId: string) {
    try {
      return await this.channelRepository.findOneOrFail({ where: { id: channelId } });
    } catch (error) {
      throw error
    }
  }
}
