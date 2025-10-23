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
exports.DistrictServicesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const district_service_entity_1 = require("./entities/district-service.entity");
let DistrictServicesService = class DistrictServicesService {
    districtServicesRepository;
    constructor(districtServicesRepository) {
        this.districtServicesRepository = districtServicesRepository;
    }
    create(createDistrictServiceDto) {
        const districtService = this.districtServicesRepository.create(createDistrictServiceDto);
        return this.districtServicesRepository.save(districtService);
    }
    findAll() {
        return this.districtServicesRepository.find();
    }
    findOne(id) {
        return this.districtServicesRepository.findOne({ where: { id } });
    }
    update(id, updateDistrictServiceDto) {
        return this.districtServicesRepository.update(id, updateDistrictServiceDto);
    }
    remove(id) {
        return this.districtServicesRepository.delete(id);
    }
};
exports.DistrictServicesService = DistrictServicesService;
exports.DistrictServicesService = DistrictServicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(district_service_entity_1.DistrictService)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DistrictServicesService);
//# sourceMappingURL=district-services.service.js.map