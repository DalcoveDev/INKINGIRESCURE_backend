import { EmergencyReport } from '../../emergency-reports/entities/emergency-report.entity';
import { User } from '../../users/entities/user.entity';
export declare class Thread {
    id: string;
    report_id: string;
    report: EmergencyReport;
    created_at: Date;
    messages: any[];
    organizer: string;
    organizerUser: User;
}
