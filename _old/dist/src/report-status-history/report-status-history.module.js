"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportStatusHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const report_status_history_service_1 = require("./report-status-history.service");
const report_status_history_controller_1 = require("./report-status-history.controller");
const report_status_history_entity_1 = require("./entities/report-status-history.entity");
let ReportStatusHistoryModule = class ReportStatusHistoryModule {
};
exports.ReportStatusHistoryModule = ReportStatusHistoryModule;
exports.ReportStatusHistoryModule = ReportStatusHistoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([report_status_history_entity_1.ReportStatusHistory])],
        controllers: [report_status_history_controller_1.ReportStatusHistoryController],
        providers: [report_status_history_service_1.ReportStatusHistoryService],
        exports: [report_status_history_service_1.ReportStatusHistoryService],
    })
], ReportStatusHistoryModule);
//# sourceMappingURL=report-status-history.module.js.map