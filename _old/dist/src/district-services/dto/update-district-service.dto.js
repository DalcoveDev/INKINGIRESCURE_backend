"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDistrictServiceDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_district_service_dto_1 = require("./create-district-service.dto");
class UpdateDistrictServiceDto extends (0, mapped_types_1.PartialType)(create_district_service_dto_1.CreateDistrictServiceDto) {
}
exports.UpdateDistrictServiceDto = UpdateDistrictServiceDto;
//# sourceMappingURL=update-district-service.dto.js.map