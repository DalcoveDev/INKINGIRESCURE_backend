import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('notifications')
export class Notification {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar')
  title: string;

  @Column('text')
  message: string;

  @Column('varchar')
  type: string;

  @Column('varchar')
  target_district: string;

  @Column('varchar', { nullable: true, array: true })
  recipients: string[];

  @Column('varchar', { array: true })
  delivery_method: string[];

  @Column('varchar', { default: 'pending' })
  status: string;

  @CreateDateColumn()
  sent_at: Date;
}