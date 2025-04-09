import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import {Messages} from "./Messages"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    email: string

    @Column()
    age: number

    @OneToMany(() => Messages, (message) => message.sender)
    sender: Messages[]

    @OneToMany(() => Messages, (message) => message.receiver)
    reciever: Messages[]
}