import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('emergency_reports')
export class EmergencyReport {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar')
  type: string;

  @Column('varchar')
  severity: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('varchar', { nullable: true, array: true })
  media: string[];

  @Column('decimal', { precision: 10, scale: 8 })
  lat: number;

  @Column('decimal', { precision: 11, scale: 8 })
  lng: number;

  @Column('varchar')
  district: string;

  @Column('varchar')
  reported_by: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'reported_by' })
  reportedBy: User;

  @Column('varchar', { default: 'pending' })
  status: string;

  @Column('varchar', { array: true, nullable: true })
  assigned_to: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relationships - using string references to avoid circular dependencies
  @OneToMany('ReportStatusHistory', 'report')
  statusHistories: any[];

  @OneToMany('Thread', 'report')
  threads: any[];

  @OneToMany('IncidentLog', 'report')
  incidentLogs: any[];

  @OneToMany('Feedback', 'report')
  feedbacks: any[];
}