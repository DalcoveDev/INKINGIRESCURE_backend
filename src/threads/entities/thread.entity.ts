import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { EmergencyReport } from '../../emergency-reports/entities/emergency-report.entity';
// Removed direct import of Message to resolve circular dependency
import { User } from '../../users/entities/user.entity';

@Entity('threads')
export class Thread {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar')
  report_id: string;

  @ManyToOne(() => EmergencyReport, { eager: true })
  @JoinColumn({ name: 'report_id' })
  report: EmergencyReport;

  @CreateDateColumn()
  created_at: Date;

  // Relationships - Using string reference to resolve circular dependency
  @OneToMany('Message', 'thread')
  messages: any[]; // Using any[] instead of Message[] to avoid circular import

  @Column('varchar')
  organizer: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'organizer' })
  organizerUser: User;
}