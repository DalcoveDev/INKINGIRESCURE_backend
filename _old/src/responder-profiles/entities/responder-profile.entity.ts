import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('responder_profiles')
export class ResponderProfile {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar')
  user_id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('varchar')
  specialization: string;

  @Column('varchar', { nullable: true, unique: true })
  badge_number: string;

  @Column('varchar', { nullable: true })
  station: string;
}