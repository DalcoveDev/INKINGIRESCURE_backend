import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar')
  user_id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('varchar')
  action: string;

  @Column('varchar')
  entity_type: string;

  @Column('varchar')
  entity_id: string;

  @CreateDateColumn()
  timestamp: Date;

  @Column('varchar', { nullable: true })
  ip_address: string;
}