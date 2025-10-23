import { Repository } from 'typeorm';
import { EmergencyReport } from './entities/emergency-report.entity';
import { CreateEmergencyReportDto } from './dto/create-emergency-report.dto';
import { UpdateEmergencyReportDto } from './dto/update-emergency-report.dto';
export declare class EmergencyReportsService {
    private emergencyReportsRepository;
    constructor(emergencyReportsRepository: Repository<EmergencyReport>);
    create(createEmergencyReportDto: CreateEmergencyReportDto): Promise<EmergencyReport>;
    findAll(): Promise<EmergencyReport[]>;
    findOne(id: string): Promise<EmergencyReport | null>;
    update(id: string, updateEmergencyReportDto: UpdateEmergencyReportDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
