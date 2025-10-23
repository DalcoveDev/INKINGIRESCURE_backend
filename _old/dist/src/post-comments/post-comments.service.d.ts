import { Repository } from 'typeorm';
import { PostComment } from './entities/post-comment.entity';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';
export declare class PostCommentsService {
    private postCommentsRepository;
    constructor(postCommentsRepository: Repository<PostComment>);
    create(createPostCommentDto: CreatePostCommentDto): Promise<PostComment>;
    findAll(): Promise<PostComment[]>;
    findOne(id: string): Promise<PostComment | null>;
    update(id: string, updatePostCommentDto: UpdatePostCommentDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
