import { Repository } from 'typeorm';
import { CommunityPost } from './entities/community-post.entity';
import { CreateCommunityPostDto } from './dto/create-community-post.dto';
import { UpdateCommunityPostDto } from './dto/update-community-post.dto';
export declare class CommunityPostsService {
    private communityPostsRepository;
    constructor(communityPostsRepository: Repository<CommunityPost>);
    create(createCommunityPostDto: CreateCommunityPostDto): Promise<CommunityPost>;
    findAll(): Promise<CommunityPost[]>;
    findOne(id: string): Promise<CommunityPost | null>;
    update(id: string, updateCommunityPostDto: UpdateCommunityPostDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
