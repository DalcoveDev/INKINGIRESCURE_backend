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
exports.ReportStatusHistory = void 0;
const typeorm_1 = require("typeorm");
const emergency_report_entity_1 = require("../../emergency-reports/entities/emergency-report.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let ReportStatusHistory = class ReportStatusHistory {
    id;
    report_id;
    report;
    status;
    changed_by;
    changedBy;
    timestamp;
    notes;
};
exports.ReportStatusHistory = ReportStatusHistory;
__decorate([
    (0, typeorm_1.PrimaryColumn)('varchar'),
    __metadata("design:type", String)
], ReportStatusHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], ReportStatusHistory.prototype, "report_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => emergency_report_entity_1.EmergencyReport, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'report_id' }),
    __metadata("design:type", emergency_report_entity_1.EmergencyReport)
], ReportStatusHistory.prototype, "report", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], ReportStatusHistory.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], ReportStatusHistory.prototype, "changed_by", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'changed_by' }),
    __metadata("design:type", user_entity_1.User)
], ReportStatusHistory.prototype, "changedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ReportStatusHistory.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], ReportStatusHistory.prototype, "notes", void 0);
exports.ReportStatusHistory = ReportStatusHistory = __decorate([
    (0, typeorm_1.Entity)('report_status_history')
], ReportStatusHistory);
//# sourceMappingURL=report-status-history.entity.js.map