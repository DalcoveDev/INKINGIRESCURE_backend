import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EmergencyReport } from '../../emergency-reports/entities/emergency-report.entity';
import { User } from '../../users/entities/user.entity';

@Entity('incident_logs')
export class IncidentLog {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar')
  report_id: string;

  @ManyToOne(() => EmergencyReport, { eager: true })
  @JoinColumn({ name: 'report_id' })
  report: EmergencyReport;

  @Column('varchar')
  resolved_by: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'resolved_by' })
  resolvedBy: User;

  @Column('int', { nullable: true })
  response_time_min: number;

  @Column('text', { nullable: true })
  resolution_notes: string;

  @CreateDateColumn()
  timestamp: Date;
}