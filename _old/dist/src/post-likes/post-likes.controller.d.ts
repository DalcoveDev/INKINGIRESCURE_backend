import { PostLikesService } from './post-likes.service';
import { CreatePostLikeDto } from './dto/create-post-like.dto';
import { UpdatePostLikeDto } from './dto/update-post-like.dto';
export declare class PostLikesController {
    private readonly postLikesService;
    constructor(postLikesService: PostLikesService);
    create(createPostLikeDto: CreatePostLikeDto): Promise<import("./entities/post-like.entity").PostLike>;
    findAll(): Promise<import("./entities/post-like.entity").PostLike[]>;
    findOne(id: string): Promise<import("./entities/post-like.entity").PostLike | null>;
    update(id: string, updatePostLikeDto: UpdatePostLikeDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
