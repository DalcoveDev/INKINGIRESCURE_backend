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
exports.PostCommentsController = void 0;
const common_1 = require("@nestjs/common");
const post_comments_service_1 = require("./post-comments.service");
const create_post_comment_dto_1 = require("./dto/create-post-comment.dto");
const update_post_comment_dto_1 = require("./dto/update-post-comment.dto");
let PostCommentsController = class PostCommentsController {
    postCommentsService;
    constructor(postCommentsService) {
        this.postCommentsService = postCommentsService;
    }
    create(createPostCommentDto) {
        return this.postCommentsService.create(createPostCommentDto);
    }
    findAll() {
        return this.postCommentsService.findAll();
    }
    findOne(id) {
        return this.postCommentsService.findOne(id);
    }
    update(id, updatePostCommentDto) {
        return this.postCommentsService.update(id, updatePostCommentDto);
    }
    remove(id) {
        return this.postCommentsService.remove(id);
    }
};
exports.PostCommentsController = PostCommentsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_comment_dto_1.CreatePostCommentDto]),
    __metadata("design:returntype", void 0)
], PostCommentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PostCommentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostCommentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_post_comment_dto_1.UpdatePostCommentDto]),
    __metadata("design:returntype", void 0)
], PostCommentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostCommentsController.prototype, "remove", null);
exports.PostCommentsController = PostCommentsController = __decorate([
    (0, common_1.Controller)('post-comments'),
    __metadata("design:paramtypes", [post_comments_service_1.PostCommentsService])
], PostCommentsController);
//# sourceMappingURL=post-comments.controller.js.map