import { CommunityPostsService } from './community-posts.service';
import { CreateCommunityPostDto } from './dto/create-community-post.dto';
import { UpdateCommunityPostDto } from './dto/update-community-post.dto';
export declare class CommunityPostsController {
    private readonly communityPostsService;
    constructor(communityPostsService: CommunityPostsService);
    create(createCommunityPostDto: CreateCommunityPostDto): Promise<import("./entities/community-post.entity").CommunityPost>;
    findAll(): Promise<import("./entities/community-post.entity").CommunityPost[]>;
    findOne(id: string): Promise<import("./entities/community-post.entity").CommunityPost | null>;
    update(id: string, updateCommunityPostDto: UpdateCommunityPostDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
