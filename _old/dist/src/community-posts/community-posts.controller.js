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
exports.CommunityPostsController = void 0;
const common_1 = require("@nestjs/common");
const community_posts_service_1 = require("./community-posts.service");
const create_community_post_dto_1 = require("./dto/create-community-post.dto");
const update_community_post_dto_1 = require("./dto/update-community-post.dto");
let CommunityPostsController = class CommunityPostsController {
    communityPostsService;
    constructor(communityPostsService) {
        this.communityPostsService = communityPostsService;
    }
    create(createCommunityPostDto) {
        return this.communityPostsService.create(createCommunityPostDto);
    }
    findAll() {
        return this.communityPostsService.findAll();
    }
    findOne(id) {
        return this.communityPostsService.findOne(id);
    }
    update(id, updateCommunityPostDto) {
        return this.communityPostsService.update(id, updateCommunityPostDto);
    }
    remove(id) {
        return this.communityPostsService.remove(id);
    }
};
exports.CommunityPostsController = CommunityPostsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_community_post_dto_1.CreateCommunityPostDto]),
    __metadata("design:returntype", void 0)
], CommunityPostsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CommunityPostsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommunityPostsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_community_post_dto_1.UpdateCommunityPostDto]),
    __metadata("design:returntype", void 0)
], CommunityPostsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommunityPostsController.prototype, "remove", null);
exports.CommunityPostsController = CommunityPostsController = __decorate([
    (0, common_1.Controller)('community-posts'),
    __metadata("design:paramtypes", [community_posts_service_1.CommunityPostsService])
], CommunityPostsController);
//# sourceMappingURL=community-posts.controller.js.map