"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunityPostsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const community_posts_service_1 = require("./community-posts.service");
const community_posts_controller_1 = require("./community-posts.controller");
const community_post_entity_1 = require("./entities/community-post.entity");
let CommunityPostsModule = class CommunityPostsModule {
};
exports.CommunityPostsModule = CommunityPostsModule;
exports.CommunityPostsModule = CommunityPostsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([community_post_entity_1.CommunityPost])],
        controllers: [community_posts_controller_1.CommunityPostsController],
        providers: [community_posts_service_1.CommunityPostsService],
        exports: [community_posts_service_1.CommunityPostsService],
    })
], CommunityPostsModule);
//# sourceMappingURL=community-posts.module.js.map