"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCommunityPostDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_community_post_dto_1 = require("./create-community-post.dto");
class UpdateCommunityPostDto extends (0, mapped_types_1.PartialType)(create_community_post_dto_1.CreateCommunityPostDto) {
}
exports.UpdateCommunityPostDto = UpdateCommunityPostDto;
//# sourceMappingURL=update-community-post.dto.js.map