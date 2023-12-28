import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";
import {
    IsEmail
} from "class-validator"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Index({unique : true})
    name: string

    @Column()
    @Index({unique : true})
    userName: string

    @Column()
    @IsEmail()
    @Index({unique : true})
    email: string

    @Column()
    password: string
}