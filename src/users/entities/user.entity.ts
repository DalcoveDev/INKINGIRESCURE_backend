import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { ResponderProfile } from '../../responder-profiles/entities/responder-profile.entity';
import { EmergencyReport } from '../../emergency-reports/entities/emergency-report.entity';
import { ReportStatusHistory } from '../../report-status-history/entities/report-status-history.entity';
import { Notification } from '../../notifications/entities/notification.entity';
import { Message } from '../../messages/entities/message.entity';
import { Thread } from '../../threads/entities/thread.entity';
import { IncidentLog } from '../../incident-logs/entities/incident-log.entity';
import { AuditLog } from '../../audit-logs/entities/audit-log.entity';
import { Feedback } from '../../feedback/entities/feedback.entity';
import { CommunityPost } from '../../community-posts/entities/community-post.entity';
import { PostComment } from '../../post-comments/entities/post-comment.entity';
import { PostLike } from '../../post-likes/entities/post-like.entity';
import { Event } from '../../events/entities/event.entity';
import { Resource } from '../../resources/entities/resource.entity';
import { Subscription } from '../../subscriptions/entities/subscription.entity';

@Entity('users')
export class User {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar', { unique: true })
  phone: string;

  @Column('varchar', { nullable: true, unique: true })
  email: string;

  @Column('varchar')
  password: string;

  @Column('varchar')
  role_id: string;

  @ManyToOne(() => Role, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column('varchar')
  district: string;

  @Column('decimal', { nullable: true, precision: 10, scale: 8 })
  lat: number;

  @Column('decimal', { nullable: true, precision: 11, scale: 8 })
  lng: number;

  @Column('varchar', { default: 'offline' })
  availability: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relationships
  @OneToMany(() => ResponderProfile, profile => profile.user)
  responderProfiles: ResponderProfile[];

  @OneToMany(() => EmergencyReport, report => report.reportedBy)
  emergencyReports: EmergencyReport[];

  @OneToMany(() => ReportStatusHistory, history => history.changedBy)
  reportStatusHistories: ReportStatusHistory[];

  @OneToMany(() => Notification, notification => notification.recipients)
  notifications: Notification[];

  @OneToMany(() => Message, message => message.sender)
  messages: Message[];

  @OneToMany(() => Thread, thread => thread.organizerUser)
  organizedThreads: Thread[];

  @OneToMany(() => IncidentLog, log => log.resolvedBy)
  incidentLogs: IncidentLog[];

  @OneToMany(() => AuditLog, log => log.user)
  auditLogs: AuditLog[];

  @OneToMany(() => Feedback, feedback => feedback.user)
  feedbacks: Feedback[];

  @OneToMany(() => CommunityPost, post => post.user)
  communityPosts: CommunityPost[];

  @OneToMany(() => PostComment, comment => comment.user)
  postComments: PostComment[];

  @OneToMany(() => PostLike, like => like.user)
  postLikes: PostLike[];

  @OneToMany(() => Event, event => event.organizerUser)
  organizedEvents: Event[];

  @OneToMany(() => Resource, resource => resource.uploadedBy)
  uploadedResources: Resource[];

  @OneToMany(() => Subscription, subscription => subscription.user)
  subscriptions: Subscription[];
}