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
exports.DistrictServicesController = void 0;
const common_1 = require("@nestjs/common");
const district_services_service_1 = require("./district-services.service");
const create_district_service_dto_1 = require("./dto/create-district-service.dto");
const update_district_service_dto_1 = require("./dto/update-district-service.dto");
let DistrictServicesController = class DistrictServicesController {
    districtServicesService;
    constructor(districtServicesService) {
        this.districtServicesService = districtServicesService;
    }
    create(createDistrictServiceDto) {
        return this.districtServicesService.create(createDistrictServiceDto);
    }
    findAll() {
        return this.districtServicesService.findAll();
    }
    findOne(id) {
        return this.districtServicesService.findOne(id);
    }
    update(id, updateDistrictServiceDto) {
        return this.districtServicesService.update(id, updateDistrictServiceDto);
    }
    remove(id) {
        return this.districtServicesService.remove(id);
    }
};
exports.DistrictServicesController = DistrictServicesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_district_service_dto_1.CreateDistrictServiceDto]),
    __metadata("design:returntype", void 0)
], DistrictServicesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DistrictServicesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DistrictServicesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_district_service_dto_1.UpdateDistrictServiceDto]),
    __metadata("design:returntype", void 0)
], DistrictServicesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DistrictServicesController.prototype, "remove", null);
exports.DistrictServicesController = DistrictServicesController = __decorate([
    (0, common_1.Controller)('district-services'),
    __metadata("design:paramtypes", [district_services_service_1.DistrictServicesService])
], DistrictServicesController);
//# sourceMappingURL=district-services.controller.js.map