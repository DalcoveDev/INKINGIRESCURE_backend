import { User } from '../../users/entities/user.entity';
export declare class Event {
    id: string;
    title: string;
    description: string;
    district: string;
    start_date: Date;
    end_date: Date;
    organizer: string;
    organizerUser: User;
}
