import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Thread } from '../../threads/entities/thread.entity';
import { User } from '../../users/entities/user.entity';

@Entity('messages')
export class Message {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar')
  thread_id: string;

  @ManyToOne(() => Thread, { eager: true })
  @JoinColumn({ name: 'thread_id' })
  thread: Thread;

  @Column('varchar')
  sender_id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @Column('text')
  content: string;

  @Column('varchar', { nullable: true, array: true })
  media: string[];

  @CreateDateColumn()
  sent_at: Date;
}