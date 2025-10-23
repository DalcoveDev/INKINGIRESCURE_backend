import { User } from '../../users/entities/user.entity';
import { EmergencyReport } from '../../emergency-reports/entities/emergency-report.entity';
export declare class Feedback {
    id: string;
    user_id: string;
    user: User;
    report_id: string;
    report: EmergencyReport;
    rating: number;
    comment: string;
    created_at: Date;
}
