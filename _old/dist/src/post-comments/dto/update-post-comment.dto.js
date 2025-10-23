"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePostCommentDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_post_comment_dto_1 = require("./create-post-comment.dto");
class UpdatePostCommentDto extends (0, mapped_types_1.PartialType)(create_post_comment_dto_1.CreatePostCommentDto) {
}
exports.UpdatePostCommentDto = UpdatePostCommentDto;
//# sourceMappingURL=update-post-comment.dto.js.map