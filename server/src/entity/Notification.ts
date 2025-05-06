import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.sentNotifications)
  @JoinColumn({ name: "sender_id" })
  sender: User;

  @Column()
  sender_id: number

  @ManyToOne(() => User, user => user.receivedNotifications)
  @JoinColumn({ name: "receiver_id" })
  receiver: User;

  @Column()
  receiver_id: number

//   @Column()
//   messageId: number;

  @Column({ default: false })
  isRead: boolean;

  @CreateDateColumn()
  created_at: Date;
}
