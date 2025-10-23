"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentLogsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const incident_logs_service_1 = require("./incident-logs.service");
const incident_logs_controller_1 = require("./incident-logs.controller");
const incident_log_entity_1 = require("./entities/incident-log.entity");
let IncidentLogsModule = class IncidentLogsModule {
};
exports.IncidentLogsModule = IncidentLogsModule;
exports.IncidentLogsModule = IncidentLogsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([incident_log_entity_1.IncidentLog])],
        controllers: [incident_logs_controller_1.IncidentLogsController],
        providers: [incident_logs_service_1.IncidentLogsService],
        exports: [incident_logs_service_1.IncidentLogsService],
    })
], IncidentLogsModule);
//# sourceMappingURL=incident-logs.module.js.map