import { Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateMessagePayload } from './message.model';

@Injectable()
export class MessageService {

  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>
  ) { }

  async create(payload: CreateMessagePayload) {
    try {
      const message = await this.messageRepository.save({
        id: uuidv4(),
        channelId: payload.channelId,
        content: payload.message,
        userId: payload.user.id
      })
      message.user = payload.user
      return message
    } catch (error) {
      throw error
    }
  }
}