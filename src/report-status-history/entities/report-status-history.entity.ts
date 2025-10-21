import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EmergencyReport } from '../../emergency-reports/entities/emergency-report.entity';
import { User } from '../../users/entities/user.entity';

@Entity('report_status_history')
export class ReportStatusHistory {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar')
  report_id: string;

  @ManyToOne(() => EmergencyReport, { eager: true })
  @JoinColumn({ name: 'report_id' })
  report: EmergencyReport;

  @Column('varchar')
  status: string;

  @Column('varchar')
  changed_by: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'changed_by' })
  changedBy: User;

  @CreateDateColumn()
  timestamp: Date;

  @Column('text', { nullable: true })
  notes: string;
}