"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponderProfilesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const responder_profiles_service_1 = require("./responder-profiles.service");
const responder_profiles_controller_1 = require("./responder-profiles.controller");
const responder_profile_entity_1 = require("./entities/responder-profile.entity");
let ResponderProfilesModule = class ResponderProfilesModule {
};
exports.ResponderProfilesModule = ResponderProfilesModule;
exports.ResponderProfilesModule = ResponderProfilesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([responder_profile_entity_1.ResponderProfile])],
        controllers: [responder_profiles_controller_1.ResponderProfilesController],
        providers: [responder_profiles_service_1.ResponderProfilesService],
        exports: [responder_profiles_service_1.ResponderProfilesService],
    })
], ResponderProfilesModule);
//# sourceMappingURL=responder-profiles.module.js.map