"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateIncidentLogDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_incident_log_dto_1 = require("./create-incident-log.dto");
class UpdateIncidentLogDto extends (0, mapped_types_1.PartialType)(create_incident_log_dto_1.CreateIncidentLogDto) {
}
exports.UpdateIncidentLogDto = UpdateIncidentLogDto;
//# sourceMappingURL=update-incident-log.dto.js.map