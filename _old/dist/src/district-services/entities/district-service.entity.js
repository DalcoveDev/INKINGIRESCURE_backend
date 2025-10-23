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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistrictService = void 0;
const typeorm_1 = require("typeorm");
let DistrictService = class DistrictService {
    id;
    district;
    police_contact;
    hospital_contact;
    fire_department_contact;
    other_services;
};
exports.DistrictService = DistrictService;
__decorate([
    (0, typeorm_1.PrimaryColumn)('varchar'),
    __metadata("design:type", String)
], DistrictService.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { unique: true }),
    __metadata("design:type", String)
], DistrictService.prototype, "district", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], DistrictService.prototype, "police_contact", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], DistrictService.prototype, "hospital_contact", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], DistrictService.prototype, "fire_department_contact", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true, array: true }),
    __metadata("design:type", Array)
], DistrictService.prototype, "other_services", void 0);
exports.DistrictService = DistrictService = __decorate([
    (0, typeorm_1.Entity)('district_services')
], DistrictService);
//# sourceMappingURL=district-service.entity.js.map