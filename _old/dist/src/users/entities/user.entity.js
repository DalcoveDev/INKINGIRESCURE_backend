"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const role_entity_1 = require("../../roles/entities/role.entity");
const responder_profile_entity_1 = require("../../responder-profiles/entities/responder-profile.entity");
const emergency_report_entity_1 = require("../../emergency-reports/entities/emergency-report.entity");
const report_status_history_entity_1 = require("../../report-status-history/entities/report-status-history.entity");
const notification_entity_1 = require("../../notifications/entities/notification.entity");
const message_entity_1 = require("../../messages/entities/message.entity");
const thread_entity_1 = require("../../threads/entities/thread.entity");
const incident_log_entity_1 = require("../../incident-logs/entities/incident-log.entity");
const audit_log_entity_1 = require("../../audit-logs/entities/audit-log.entity");
const feedback_entity_1 = require("../../feedback/entities/feedback.entity");
const community_post_entity_1 = require("../../community-posts/entities/community-post.entity");
const post_comment_entity_1 = require("../../post-comments/entities/post-comment.entity");
const post_like_entity_1 = require("../../post-likes/entities/post-like.entity");
const event_entity_1 = require("../../events/entities/event.entity");
const resource_entity_1 = require("../../resources/entities/resource.entity");
const subscription_entity_1 = require("../../subscriptions/entities/subscription.entity");
let User = class User {
    id;
    name;
    phone;
    email;
    password;
    role_id;
    role;
    district;
    lat;
    lng;
    availability;
    created_at;
    updated_at;
    responderProfiles;
    emergencyReports;
    reportStatusHistories;
    notifications;
    messages;
    organizedThreads;
    incidentLogs;
    auditLogs;
    feedbacks;
    communityPosts;
    postComments;
    postLikes;
    organizedEvents;
    uploadedResources;
    subscriptions;
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryColumn)('varchar'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { unique: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], User.prototype, "role_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_entity_1.Role, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'role_id' }),
    __metadata("design:type", role_entity_1.Role)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], User.prototype, "district", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { nullable: true, precision: 10, scale: 8 }),
    __metadata("design:type", Number)
], User.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { nullable: true, precision: 11, scale: 8 }),
    __metadata("design:type", Number)
], User.prototype, "lng", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { default: 'offline' }),
    __metadata("design:type", String)
], User.prototype, "availability", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => responder_profile_entity_1.ResponderProfile, profile => profile.user),
    __metadata("design:type", Array)
], User.prototype, "responderProfiles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => emergency_report_entity_1.EmergencyReport, report => report.reportedBy),
    __metadata("design:type", Array)
], User.prototype, "emergencyReports", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => report_status_history_entity_1.ReportStatusHistory, history => history.changedBy),
    __metadata("design:type", Array)
], User.prototype, "reportStatusHistories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_entity_1.Notification, notification => notification.recipients),
    __metadata("design:type", Array)
], User.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.Message, message => message.sender),
    __metadata("design:type", Array)
], User.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => thread_entity_1.Thread, thread => thread.organizerUser),
    __metadata("design:type", Array)
], User.prototype, "organizedThreads", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => incident_log_entity_1.IncidentLog, log => log.resolvedBy),
    __metadata("design:type", Array)
], User.prototype, "incidentLogs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => audit_log_entity_1.AuditLog, log => log.user),
    __metadata("design:type", Array)
], User.prototype, "auditLogs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => feedback_entity_1.Feedback, feedback => feedback.user),
    __metadata("design:type", Array)
], User.prototype, "feedbacks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => community_post_entity_1.CommunityPost, post => post.user),
    __metadata("design:type", Array)
], User.prototype, "communityPosts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_comment_entity_1.PostComment, comment => comment.user),
    __metadata("design:type", Array)
], User.prototype, "postComments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_like_entity_1.PostLike, like => like.user),
    __metadata("design:type", Array)
], User.prototype, "postLikes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => event_entity_1.Event, event => event.organizerUser),
    __metadata("design:type", Array)
], User.prototype, "organizedEvents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => resource_entity_1.Resource, resource => resource.uploadedBy),
    __metadata("design:type", Array)
], User.prototype, "uploadedResources", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => subscription_entity_1.Subscription, subscription => subscription.user),
    __metadata("design:type", Array)
], User.prototype, "subscriptions", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=user.entity.js.map