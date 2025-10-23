"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCommentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const post_comments_service_1 = require("./post-comments.service");
const post_comments_controller_1 = require("./post-comments.controller");
const post_comment_entity_1 = require("./entities/post-comment.entity");
let PostCommentsModule = class PostCommentsModule {
};
exports.PostCommentsModule = PostCommentsModule;
exports.PostCommentsModule = PostCommentsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([post_comment_entity_1.PostComment])],
        controllers: [post_comments_controller_1.PostCommentsController],
        providers: [post_comments_service_1.PostCommentsService],
        exports: [post_comments_service_1.PostCommentsService],
    })
], PostCommentsModule);
//# sourceMappingURL=post-comments.module.js.map