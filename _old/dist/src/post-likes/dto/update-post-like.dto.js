"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePostLikeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_post_like_dto_1 = require("./create-post-like.dto");
class UpdatePostLikeDto extends (0, mapped_types_1.PartialType)(create_post_like_dto_1.CreatePostLikeDto) {
}
exports.UpdatePostLikeDto = UpdatePostLikeDto;
//# sourceMappingURL=update-post-like.dto.js.map