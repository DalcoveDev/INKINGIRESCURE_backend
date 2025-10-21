import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { ResponderProfilesModule } from './responder-profiles/responder-profiles.module';
import { EmergencyReportsModule } from './emergency-reports/emergency-reports.module';
import { ReportStatusHistoryModule } from './report-status-history/report-status-history.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MessagesModule } from './messages/messages.module';
import { ThreadsModule } from './threads/threads.module';
import { IncidentLogsModule } from './incident-logs/incident-logs.module';
import { DistrictServicesModule } from './district-services/district-services.module';
import { AuditLogsModule } from './audit-logs/audit-logs.module';
import { FeedbackModule } from './feedback/feedback.module';
import { SystemSettingsModule } from './system-settings/system-settings.module';
import { CommunityPostsModule } from './community-posts/community-posts.module';
import { PostCommentsModule } from './post-comments/post-comments.module';
import { PostLikesModule } from './post-likes/post-likes.module';
import { EventsModule } from './events/events.module';
import { ResourcesModule } from './resources/resources.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { User } from './users/entities/user.entity';
import { EmergencyReport } from './emergency-reports/entities/emergency-report.entity';
import { Thread } from './threads/entities/thread.entity';
import { Message } from './messages/entities/message.entity';
import { Role } from './roles/entities/role.entity';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    ResponderProfilesModule,
    EmergencyReportsModule,
    ReportStatusHistoryModule,
    NotificationsModule,
    MessagesModule,
    ThreadsModule,
    IncidentLogsModule,
    DistrictServicesModule,
    AuditLogsModule,
    FeedbackModule,
    SystemSettingsModule,
    CommunityPostsModule,
    PostCommentsModule,
    PostLikesModule,
    EventsModule,
    ResourcesModule,
    SubscriptionsModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService available app-wide
    }),
    TypeOrmModule.forFeature([User, EmergencyReport, Thread, Message, Role]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: parseInt(configService.get<string>('DB_PORT', '8080'), 10),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', '123'),
        database: configService.get<string>('DB_DATABASE', 'INKINGI'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // For dev only. Disable in production.
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}