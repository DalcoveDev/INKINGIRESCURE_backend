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
exports.IncidentLogsController = void 0;
const common_1 = require("@nestjs/common");
const incident_logs_service_1 = require("./incident-logs.service");
const create_incident_log_dto_1 = require("./dto/create-incident-log.dto");
const update_incident_log_dto_1 = require("./dto/update-incident-log.dto");
let IncidentLogsController = class IncidentLogsController {
    incidentLogsService;
    constructor(incidentLogsService) {
        this.incidentLogsService = incidentLogsService;
    }
    create(createIncidentLogDto) {
        return this.incidentLogsService.create(createIncidentLogDto);
    }
    findAll() {
        return this.incidentLogsService.findAll();
    }
    findOne(id) {
        return this.incidentLogsService.findOne(id);
    }
    update(id, updateIncidentLogDto) {
        return this.incidentLogsService.update(id, updateIncidentLogDto);
    }
    remove(id) {
        return this.incidentLogsService.remove(id);
    }
};
exports.IncidentLogsController = IncidentLogsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_incident_log_dto_1.CreateIncidentLogDto]),
    __metadata("design:returntype", void 0)
], IncidentLogsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IncidentLogsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IncidentLogsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_incident_log_dto_1.UpdateIncidentLogDto]),
    __metadata("design:returntype", void 0)
], IncidentLogsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IncidentLogsController.prototype, "remove", null);
exports.IncidentLogsController = IncidentLogsController = __decorate([
    (0, common_1.Controller)('incident-logs'),
    __metadata("design:paramtypes", [incident_logs_service_1.IncidentLogsService])
], IncidentLogsController);
//# sourceMappingURL=incident-logs.controller.js.map