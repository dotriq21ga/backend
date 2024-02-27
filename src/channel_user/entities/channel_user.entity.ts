import { Channel } from "src/channel/entities/channel.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ChannelUser {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @PrimaryColumn('uuid')
    userId: string;

    @PrimaryColumn('uuid')
    channelId: string;

    @Column({ default: false })
    isAdmin: boolean

    @ManyToOne(() => User, user => user.channelUser)
    user: User;

    @ManyToOne(() => Channel, channel => channel.channelUser)
    channel: Channel;
}