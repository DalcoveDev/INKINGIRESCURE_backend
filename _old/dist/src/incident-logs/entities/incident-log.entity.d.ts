import { EmergencyReport } from '../../emergency-reports/entities/emergency-report.entity';
import { User } from '../../users/entities/user.entity';
export declare class IncidentLog {
    id: string;
    report_id: string;
    report: EmergencyReport;
    resolved_by: string;
    resolvedBy: User;
    response_time_min: number;
    resolution_notes: string;
    timestamp: Date;
}
