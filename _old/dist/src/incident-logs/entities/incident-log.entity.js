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
exports.IncidentLog = void 0;
const typeorm_1 = require("typeorm");
const emergency_report_entity_1 = require("../../emergency-reports/entities/emergency-report.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let IncidentLog = class IncidentLog {
    id;
    report_id;
    report;
    resolved_by;
    resolvedBy;
    response_time_min;
    resolution_notes;
    timestamp;
};
exports.IncidentLog = IncidentLog;
__decorate([
    (0, typeorm_1.PrimaryColumn)('varchar'),
    __metadata("design:type", String)
], IncidentLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], IncidentLog.prototype, "report_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => emergency_report_entity_1.EmergencyReport, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'report_id' }),
    __metadata("design:type", emergency_report_entity_1.EmergencyReport)
], IncidentLog.prototype, "report", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], IncidentLog.prototype, "resolved_by", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'resolved_by' }),
    __metadata("design:type", user_entity_1.User)
], IncidentLog.prototype, "resolvedBy", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: true }),
    __metadata("design:type", Number)
], IncidentLog.prototype, "response_time_min", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], IncidentLog.prototype, "resolution_notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], IncidentLog.prototype, "timestamp", void 0);
exports.IncidentLog = IncidentLog = __decorate([
    (0, typeorm_1.Entity)('incident_logs')
], IncidentLog);
//# sourceMappingURL=incident-log.entity.js.map