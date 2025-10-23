import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { EmergencyReport } from '../../emergency-reports/entities/emergency-report.entity';

@Entity('feedback')
export class Feedback {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar')
  user_id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('varchar')
  report_id: string;

  @ManyToOne(() => EmergencyReport, { eager: true })
  @JoinColumn({ name: 'report_id' })
  report: EmergencyReport;

  @Column('int')
  rating: number;

  @Column('text', { nullable: true })
  comment: string;

  @CreateDateColumn()
  created_at: Date;
}