"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const roles_module_1 = require("./roles/roles.module");
const responder_profiles_module_1 = require("./responder-profiles/responder-profiles.module");
const emergency_reports_module_1 = require("./emergency-reports/emergency-reports.module");
const report_status_history_module_1 = require("./report-status-history/report-status-history.module");
const notifications_module_1 = require("./notifications/notifications.module");
const messages_module_1 = require("./messages/messages.module");
const threads_module_1 = require("./threads/threads.module");
const incident_logs_module_1 = require("./incident-logs/incident-logs.module");
const district_services_module_1 = require("./district-services/district-services.module");
const audit_logs_module_1 = require("./audit-logs/audit-logs.module");
const feedback_module_1 = require("./feedback/feedback.module");
const system_settings_module_1 = require("./system-settings/system-settings.module");
const community_posts_module_1 = require("./community-posts/community-posts.module");
const post_comments_module_1 = require("./post-comments/post-comments.module");
const post_likes_module_1 = require("./post-likes/post-likes.module");
const events_module_1 = require("./events/events.module");
const resources_module_1 = require("./resources/resources.module");
const subscriptions_module_1 = require("./subscriptions/subscriptions.module");
const user_entity_1 = require("./users/entities/user.entity");
const emergency_report_entity_1 = require("./emergency-reports/entities/emergency-report.entity");
const thread_entity_1 = require("./threads/entities/thread.entity");
const message_entity_1 = require("./messages/entities/message.entity");
const role_entity_1 = require("./roles/entities/role.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            roles_module_1.RolesModule,
            responder_profiles_module_1.ResponderProfilesModule,
            emergency_reports_module_1.EmergencyReportsModule,
            report_status_history_module_1.ReportStatusHistoryModule,
            notifications_module_1.NotificationsModule,
            messages_module_1.MessagesModule,
            threads_module_1.ThreadsModule,
            incident_logs_module_1.IncidentLogsModule,
            district_services_module_1.DistrictServicesModule,
            audit_logs_module_1.AuditLogsModule,
            feedback_module_1.FeedbackModule,
            system_settings_module_1.SystemSettingsModule,
            community_posts_module_1.CommunityPostsModule,
            post_comments_module_1.PostCommentsModule,
            post_likes_module_1.PostLikesModule,
            events_module_1.EventsModule,
            resources_module_1.ResourcesModule,
            subscriptions_module_1.SubscriptionsModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, emergency_report_entity_1.EmergencyReport, thread_entity_1.Thread, message_entity_1.Message, role_entity_1.Role]),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST', 'localhost'),
                    port: parseInt(configService.get('DB_PORT', '8080'), 10),
                    username: configService.get('DB_USERNAME', 'postgres'),
                    password: configService.get('DB_PASSWORD', '123'),
                    database: configService.get('DB_DATABASE', 'INKINGI'),
                    entities: [__dirname + '/**/*.entity{.ts,.js}'],
                    synchronize: true,
                }),
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map