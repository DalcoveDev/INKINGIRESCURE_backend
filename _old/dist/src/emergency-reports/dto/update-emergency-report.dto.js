"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmergencyReportDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_emergency_report_dto_1 = require("./create-emergency-report.dto");
class UpdateEmergencyReportDto extends (0, mapped_types_1.PartialType)(create_emergency_report_dto_1.CreateEmergencyReportDto) {
}
exports.UpdateEmergencyReportDto = UpdateEmergencyReportDto;
//# sourceMappingURL=update-emergency-report.dto.js.map