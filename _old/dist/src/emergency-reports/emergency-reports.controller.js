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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmergencyReportsController = void 0;
const common_1 = require("@nestjs/common");
const emergency_reports_service_1 = require("./emergency-reports.service");
const create_emergency_report_dto_1 = require("./dto/create-emergency-report.dto");
const update_emergency_report_dto_1 = require("./dto/update-emergency-report.dto");
let EmergencyReportsController = class EmergencyReportsController {
    emergencyReportsService;
    constructor(emergencyReportsService) {
        this.emergencyReportsService = emergencyReportsService;
    }
    create(createEmergencyReportDto) {
        return this.emergencyReportsService.create(createEmergencyReportDto);
    }
    findAll() {
        return this.emergencyReportsService.findAll();
    }
    findOne(id) {
        return this.emergencyReportsService.findOne(id);
    }
    update(id, updateEmergencyReportDto) {
        return this.emergencyReportsService.update(id, updateEmergencyReportDto);
    }
    remove(id) {
        return this.emergencyReportsService.remove(id);
    }
};
exports.EmergencyReportsController = EmergencyReportsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_emergency_report_dto_1.CreateEmergencyReportDto]),
    __metadata("design:returntype", void 0)
], EmergencyReportsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmergencyReportsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmergencyReportsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_emergency_report_dto_1.UpdateEmergencyReportDto]),
    __metadata("design:returntype", void 0)
], EmergencyReportsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmergencyReportsController.prototype, "remove", null);
exports.EmergencyReportsController = EmergencyReportsController = __decorate([
    (0, common_1.Controller)('emergency-reports'),
    __metadata("design:paramtypes", [emergency_reports_service_1.EmergencyReportsService])
], EmergencyReportsController);
//# sourceMappingURL=emergency-reports.controller.js.map