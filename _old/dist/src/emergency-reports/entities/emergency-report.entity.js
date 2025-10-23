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
exports.EmergencyReport = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
let EmergencyReport = class EmergencyReport {
    id;
    type;
    severity;
    description;
    media;
    lat;
    lng;
    district;
    reported_by;
    reportedBy;
    status;
    assigned_to;
    created_at;
    updated_at;
    statusHistories;
    threads;
    incidentLogs;
    feedbacks;
};
exports.EmergencyReport = EmergencyReport;
__decorate([
    (0, typeorm_1.PrimaryColumn)('varchar'),
    __metadata("design:type", String)
], EmergencyReport.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], EmergencyReport.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], EmergencyReport.prototype, "severity", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], EmergencyReport.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true, array: true }),
    __metadata("design:type", Array)
], EmergencyReport.prototype, "media", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 8 }),
    __metadata("design:type", Number)
], EmergencyReport.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 11, scale: 8 }),
    __metadata("design:type", Number)
], EmergencyReport.prototype, "lng", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], EmergencyReport.prototype, "district", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], EmergencyReport.prototype, "reported_by", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'reported_by' }),
    __metadata("design:type", user_entity_1.User)
], EmergencyReport.prototype, "reportedBy", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { default: 'pending' }),
    __metadata("design:type", String)
], EmergencyReport.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { array: true, nullable: true }),
    __metadata("design:type", Array)
], EmergencyReport.prototype, "assigned_to", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], EmergencyReport.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], EmergencyReport.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('ReportStatusHistory', 'report'),
    __metadata("design:type", Array)
], EmergencyReport.prototype, "statusHistories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('Thread', 'report'),
    __metadata("design:type", Array)
], EmergencyReport.prototype, "threads", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('IncidentLog', 'report'),
    __metadata("design:type", Array)
], EmergencyReport.prototype, "incidentLogs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('Feedback', 'report'),
    __metadata("design:type", Array)
], EmergencyReport.prototype, "feedbacks", void 0);
exports.EmergencyReport = EmergencyReport = __decorate([
    (0, typeorm_1.Entity)('emergency_reports')
], EmergencyReport);
//# sourceMappingURL=emergency-report.entity.js.map