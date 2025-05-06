import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Timestamp, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./User";

@Entity()
export class Messages {
    @PrimaryGeneratedColumn()
    id : number

    @ManyToOne(() => User, (user) => user.sender)
    @JoinColumn({name: 'sender_id'})
    sender: User

    @Column()
    sender_id: number

    @ManyToOne(() => User, (user) => user.reciever)
    @JoinColumn({name: 'receiver_id'})
    receiver: User

    @Column()
    receiver_id: number

    @Column()
    content: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    // @Column()
    // updated_at: timestamp
}