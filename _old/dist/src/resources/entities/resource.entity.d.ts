import { User } from '../../users/entities/user.entity';
export declare class Resource {
    id: string;
    title: string;
    description: string;
    file_url: string;
    category: string;
    uploaded_by: string;
    uploadedBy: User;
    created_at: Date;
}
