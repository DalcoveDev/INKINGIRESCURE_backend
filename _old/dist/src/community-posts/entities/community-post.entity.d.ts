import { User } from '../../users/entities/user.entity';
import { PostComment } from '../../post-comments/entities/post-comment.entity';
import { PostLike } from '../../post-likes/entities/post-like.entity';
export declare class CommunityPost {
    id: string;
    user_id: string;
    user: User;
    title: string;
    content: string;
    media: string[];
    category: string;
    district: string;
    created_at: Date;
    updated_at: Date;
    comments: PostComment[];
    likes: PostLike[];
}
