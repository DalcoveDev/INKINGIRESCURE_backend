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
exports.PostLikesController = void 0;
const common_1 = require("@nestjs/common");
const post_likes_service_1 = require("./post-likes.service");
const create_post_like_dto_1 = require("./dto/create-post-like.dto");
const update_post_like_dto_1 = require("./dto/update-post-like.dto");
let PostLikesController = class PostLikesController {
    postLikesService;
    constructor(postLikesService) {
        this.postLikesService = postLikesService;
    }
    create(createPostLikeDto) {
        return this.postLikesService.create(createPostLikeDto);
    }
    findAll() {
        return this.postLikesService.findAll();
    }
    findOne(id) {
        return this.postLikesService.findOne(id);
    }
    update(id, updatePostLikeDto) {
        return this.postLikesService.update(id, updatePostLikeDto);
    }
    remove(id) {
        return this.postLikesService.remove(id);
    }
};
exports.PostLikesController = PostLikesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_like_dto_1.CreatePostLikeDto]),
    __metadata("design:returntype", void 0)
], PostLikesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PostLikesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostLikesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_post_like_dto_1.UpdatePostLikeDto]),
    __metadata("design:returntype", void 0)
], PostLikesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostLikesController.prototype, "remove", null);
exports.PostLikesController = PostLikesController = __decorate([
    (0, common_1.Controller)('post-likes'),
    __metadata("design:paramtypes", [post_likes_service_1.PostLikesService])
], PostLikesController);
//# sourceMappingURL=post-likes.controller.js.map