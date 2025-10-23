"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistrictServicesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const district_services_service_1 = require("./district-services.service");
const district_services_controller_1 = require("./district-services.controller");
const district_service_entity_1 = require("./entities/district-service.entity");
let DistrictServicesModule = class DistrictServicesModule {
};
exports.DistrictServicesModule = DistrictServicesModule;
exports.DistrictServicesModule = DistrictServicesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([district_service_entity_1.DistrictService])],
        controllers: [district_services_controller_1.DistrictServicesController],
        providers: [district_services_service_1.DistrictServicesService],
        exports: [district_services_service_1.DistrictServicesService],
    })
], DistrictServicesModule);
//# sourceMappingURL=district-services.module.js.map