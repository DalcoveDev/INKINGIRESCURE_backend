import { CommunityPost } from '../../community-posts/entities/community-post.entity';
import { User } from '../../users/entities/user.entity';
export declare class PostLike {
    id: string;
    post_id: string;
    post: CommunityPost;
    user_id: string;
    user: User;
    created_at: Date;
}
