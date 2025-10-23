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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./users/entities/user.entity");
const emergency_report_entity_1 = require("./emergency-reports/entities/emergency-report.entity");
const thread_entity_1 = require("./threads/entities/thread.entity");
const message_entity_1 = require("./messages/entities/message.entity");
const role_entity_1 = require("./roles/entities/role.entity");
let AppService = class AppService {
    usersRepository;
    reportsRepository;
    threadsRepository;
    messagesRepository;
    rolesRepository;
    constructor(usersRepository, reportsRepository, threadsRepository, messagesRepository, rolesRepository) {
        this.usersRepository = usersRepository;
        this.reportsRepository = reportsRepository;
        this.threadsRepository = threadsRepository;
        this.messagesRepository = messagesRepository;
        this.rolesRepository = rolesRepository;
    }
    getHello() {
        return 'Hello World!';
    }
    getDatabaseSummary() {
        return {
            message: 'Database summary endpoint is available but not implemented in this simplified version.',
            instructions: 'Please check the COMPLETE_API_DOCS.md file for database integration details and sample data.'
        };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(emergency_report_entity_1.EmergencyReport)),
    __param(2, (0, typeorm_1.InjectRepository)(thread_entity_1.Thread)),
    __param(3, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __param(4, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AppService);
//# sourceMappingURL=app.service.js.map