import { PostCommentsService } from './post-comments.service';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';
export declare class PostCommentsController {
    private readonly postCommentsService;
    constructor(postCommentsService: PostCommentsService);
    create(createPostCommentDto: CreatePostCommentDto): Promise<import("./entities/post-comment.entity").PostComment>;
    findAll(): Promise<import("./entities/post-comment.entity").PostComment[]>;
    findOne(id: string): Promise<import("./entities/post-comment.entity").PostComment | null>;
    update(id: string, updatePostCommentDto: UpdatePostCommentDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
