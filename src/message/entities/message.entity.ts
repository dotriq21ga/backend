import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Channel } from "src/channel/entities/channel.entity";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid', { nullable: true , default : null})
    userId: string;

    @PrimaryColumn('uuid')
    channelId: string;

    @Column()
    content: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    send_at: Date;

    @ManyToOne(() => User, user => user.message, { nullable: true })
    user: User | null;

    @ManyToOne(() => Channel, channel => channel.message)
    channel: Channel;
}