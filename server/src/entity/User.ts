import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import {Messages} from "./Messages"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({nullable: true})
    nickname: string

    @Column()
    email: string

    @Column()
    sub: string

    @Column()
    picture: string

    @OneToMany(() => Messages, (message) => message.sender)
    sender: Messages[]

    @OneToMany(() => Messages, (message) => message.receiver)
    reciever: Messages[]
}