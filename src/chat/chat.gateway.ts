import { WebSocketGateway, SubscribeMessage, WebSocketServer, OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChannelService } from 'src/channel/channel.service';
import { ChannelUserService } from 'src/channel_user/channel_user.service';
import { UserService } from 'src/user/user.service';
import { MessageService } from 'src/message/message.service';
import { CreateChannelDto } from 'src/channel/dto/create-channel.dto';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';

@WebSocketGateway(8000, {
  cors: {
    origin: "http://localhost:4200",
    credentials: true,
  }
})

export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(
    private messageService: MessageService,
    private channelService: ChannelService,
    private channelUserService: ChannelUserService,
    private userService: UserService,
  ) { }

  async handleConnection(client: Socket, ...args: any[]) {
    try {
      const user = await this.userService.auth(client.handshake.headers.authorization);
      const userChannels = await this.channelUserService.findChanelOfUser(user.id);
      userChannels.forEach(userChannel => client.join(userChannel.channelId));
      client.join(user.id);
      if (!user) throw Error;
    } catch (error) {
      client.disconnect();
    }
  }

  @SubscribeMessage('createChannel')
  async createChannel(client: Socket, createChannelDto: CreateChannelDto) {
    try {
      const user = await this.userService.auth(client.handshake.headers.authorization);
      const channel = await this.channelService.create({ ...createChannelDto, ownerId: user.id });
      client.join(channel.id);
      this.server.to(user.id).emit('createOrJoinChannelSuccess', channel)
    } catch (error) {
      console.log(error)
    }
  }

  @SubscribeMessage('channelContent')
  async getDataChannel(client: Socket, channelId: string) {
    try {
      const channelMessages = await this.channelService.getChannelMessages(channelId);
      channelMessages['onlineUser'] = this.server.sockets.adapter.rooms.get(channelId)?.size ?? 0;
      this.server.to(channelId).emit("channelContent", channelMessages);
    } catch (error) {
      console.log(error)
    }
  }

  @SubscribeMessage('joinChannel')
  async joinChannel(client: Socket, channelId: string) {
    try {
      const isAdmin = false;
      const user = await this.userService.auth(client.handshake.headers.authorization);
      const channel = await this.channelService.channelExists(channelId);
      await this.channelUserService.joinChannel(channelId, user.id, isAdmin);
      client.join(channelId);
      this.server.to(user.id).emit("createOrJoinChannelSuccess", channel);
    } catch (error) {
      console.log(error)
    }
  }

  @SubscribeMessage('createMessage')
  async createMessage(client: Socket, createMessage: CreateMessageDto) {
    const user = await this.userService.auth(client.handshake.headers.authorization);
    try {
      const message = await this.messageService.create({ channelId: createMessage.channelId, message: createMessage.message, user });
      this.server.to(createMessage.channelId).emit("createMessageSuccess", message);
    } catch (error) {
      console.log(error)
    }
  }
}