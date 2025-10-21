import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('events')
export class Event {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar')
  title: string;

  @Column('text')
  description: string;

  @Column('varchar')
  district: string;

  @Column('date')
  start_date: Date;

  @Column('date')
  end_date: Date;

  @Column('varchar')
  organizer: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'organizer' })
  organizerUser: User;
}