import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany } from "typeorm";
import { IsEmail } from "class-validator";
import { ChannelUser } from "src/channel_user/entities/channel_user.entity";
import { Message } from "src/message/entities/message.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    @Index({ unique: true })
    name: string

    @Column()
    @Index({ unique: true })
    userName: string

    @Column()
    @IsEmail()
    @Index({ unique: true })
    email: string

    @Column()
    password: string

    @Column({ nullable: true })
    avatar: string

    @OneToMany(() => ChannelUser, channelUser => channelUser.user)
    channelUser: ChannelUser[]

    @OneToMany(() => Message, message => message.user)
    message: Message[]
}