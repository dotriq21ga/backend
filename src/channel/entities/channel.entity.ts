import { ChannelUser } from "src/channel_user/entities/channel_user.entity";
import { Message } from "src/message/entities/message.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Channel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => ChannelUser, channelUser => channelUser.channel)
    channelUser: ChannelUser[];

    @OneToMany(() => Message, message => message.channel)
    message: Message[];
}