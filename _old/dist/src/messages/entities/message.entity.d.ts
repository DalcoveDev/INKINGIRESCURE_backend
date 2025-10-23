import { Thread } from '../../threads/entities/thread.entity';
import { User } from '../../users/entities/user.entity';
export declare class Message {
    id: string;
    thread_id: string;
    thread: Thread;
    sender_id: string;
    sender: User;
    content: string;
    media: string[];
    sent_at: Date;
}
