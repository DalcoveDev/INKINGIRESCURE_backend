import { Repository } from 'typeorm';
import { PostLike } from './entities/post-like.entity';
import { CreatePostLikeDto } from './dto/create-post-like.dto';
import { UpdatePostLikeDto } from './dto/update-post-like.dto';
export declare class PostLikesService {
    private postLikesRepository;
    constructor(postLikesRepository: Repository<PostLike>);
    create(createPostLikeDto: CreatePostLikeDto): Promise<PostLike>;
    findAll(): Promise<PostLike[]>;
    findOne(id: string): Promise<PostLike | null>;
    update(id: string, updatePostLikeDto: UpdatePostLikeDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
