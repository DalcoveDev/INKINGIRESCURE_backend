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
exports.ResponderProfilesController = void 0;
const common_1 = require("@nestjs/common");
const responder_profiles_service_1 = require("./responder-profiles.service");
const create_responder_profile_dto_1 = require("./dto/create-responder-profile.dto");
const update_responder_profile_dto_1 = require("./dto/update-responder-profile.dto");
let ResponderProfilesController = class ResponderProfilesController {
    responderProfilesService;
    constructor(responderProfilesService) {
        this.responderProfilesService = responderProfilesService;
    }
    create(createResponderProfileDto) {
        return this.responderProfilesService.create(createResponderProfileDto);
    }
    findAll() {
        return this.responderProfilesService.findAll();
    }
    findOne(id) {
        return this.responderProfilesService.findOne(id);
    }
    update(id, updateResponderProfileDto) {
        return this.responderProfilesService.update(id, updateResponderProfileDto);
    }
    remove(id) {
        return this.responderProfilesService.remove(id);
    }
};
exports.ResponderProfilesController = ResponderProfilesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_responder_profile_dto_1.CreateResponderProfileDto]),
    __metadata("design:returntype", void 0)
], ResponderProfilesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ResponderProfilesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResponderProfilesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_responder_profile_dto_1.UpdateResponderProfileDto]),
    __metadata("design:returntype", void 0)
], ResponderProfilesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResponderProfilesController.prototype, "remove", null);
exports.ResponderProfilesController = ResponderProfilesController = __decorate([
    (0, common_1.Controller)('responder-profiles'),
    __metadata("design:paramtypes", [responder_profiles_service_1.ResponderProfilesService])
], ResponderProfilesController);
//# sourceMappingURL=responder-profiles.controller.js.map