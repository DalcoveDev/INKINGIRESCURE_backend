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
exports.CommunityPostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const community_post_entity_1 = require("./entities/community-post.entity");
let CommunityPostsService = class CommunityPostsService {
    communityPostsRepository;
    constructor(communityPostsRepository) {
        this.communityPostsRepository = communityPostsRepository;
    }
    create(createCommunityPostDto) {
        const communityPost = this.communityPostsRepository.create(createCommunityPostDto);
        return this.communityPostsRepository.save(communityPost);
    }
    findAll() {
        return this.communityPostsRepository.find();
    }
    findOne(id) {
        return this.communityPostsRepository.findOne({ where: { id } });
    }
    update(id, updateCommunityPostDto) {
        return this.communityPostsRepository.update(id, updateCommunityPostDto);
    }
    remove(id) {
        return this.communityPostsRepository.delete(id);
    }
};
exports.CommunityPostsService = CommunityPostsService;
exports.CommunityPostsService = CommunityPostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(community_post_entity_1.CommunityPost)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CommunityPostsService);
//# sourceMappingURL=community-posts.service.js.map