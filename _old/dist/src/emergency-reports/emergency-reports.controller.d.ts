import { EmergencyReportsService } from './emergency-reports.service';
import { CreateEmergencyReportDto } from './dto/create-emergency-report.dto';
import { UpdateEmergencyReportDto } from './dto/update-emergency-report.dto';
export declare class EmergencyReportsController {
    private readonly emergencyReportsService;
    constructor(emergencyReportsService: EmergencyReportsService);
    create(createEmergencyReportDto: CreateEmergencyReportDto): Promise<import("./entities/emergency-report.entity").EmergencyReport>;
    findAll(): Promise<import("./entities/emergency-report.entity").EmergencyReport[]>;
    findOne(id: string): Promise<import("./entities/emergency-report.entity").EmergencyReport | null>;
    update(id: string, updateEmergencyReportDto: UpdateEmergencyReportDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
