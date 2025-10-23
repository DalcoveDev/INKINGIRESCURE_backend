import { User } from '../../users/entities/user.entity';
export declare class AuditLog {
    id: string;
    user_id: string;
    user: User;
    action: string;
    entity_type: string;
    entity_id: string;
    timestamp: Date;
    ip_address: string;
}
