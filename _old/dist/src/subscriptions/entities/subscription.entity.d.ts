import { User } from '../../users/entities/user.entity';
export declare class Subscription {
    id: string;
    user_id: string;
    user: User;
    topic: string;
    district: string;
    created_at: Date;
}
