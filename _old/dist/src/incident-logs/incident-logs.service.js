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
exports.IncidentLogsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const incident_log_entity_1 = require("./entities/incident-log.entity");
let IncidentLogsService = class IncidentLogsService {
    incidentLogsRepository;
    constructor(incidentLogsRepository) {
        this.incidentLogsRepository = incidentLogsRepository;
    }
    create(createIncidentLogDto) {
        const incidentLog = this.incidentLogsRepository.create(createIncidentLogDto);
        return this.incidentLogsRepository.save(incidentLog);
    }
    findAll() {
        return this.incidentLogsRepository.find();
    }
    findOne(id) {
        return this.incidentLogsRepository.findOne({ where: { id } });
    }
    update(id, updateIncidentLogDto) {
        return this.incidentLogsRepository.update(id, updateIncidentLogDto);
    }
    remove(id) {
        return this.incidentLogsRepository.delete(id);
    }
};
exports.IncidentLogsService = IncidentLogsService;
exports.IncidentLogsService = IncidentLogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(incident_log_entity_1.IncidentLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], IncidentLogsService);
//# sourceMappingURL=incident-logs.service.js.map