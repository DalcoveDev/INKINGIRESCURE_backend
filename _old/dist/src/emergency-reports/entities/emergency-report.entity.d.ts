import { User } from '../../users/entities/user.entity';
export declare class EmergencyReport {
    id: string;
    type: string;
    severity: string;
    description: string;
    media: string[];
    lat: number;
    lng: number;
    district: string;
    reported_by: string;
    reportedBy: User;
    status: string;
    assigned_to: string[];
    created_at: Date;
    updated_at: Date;
    statusHistories: any[];
    threads: any[];
    incidentLogs: any[];
    feedbacks: any[];
}
