import { EmergencyReport } from '../../emergency-reports/entities/emergency-report.entity';
import { User } from '../../users/entities/user.entity';
export declare class ReportStatusHistory {
    id: string;
    report_id: string;
    report: EmergencyReport;
    status: string;
    changed_by: string;
    changedBy: User;
    timestamp: Date;
    notes: string;
}
