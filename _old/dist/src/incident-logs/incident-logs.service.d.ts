import { Repository } from 'typeorm';
import { IncidentLog } from './entities/incident-log.entity';
import { CreateIncidentLogDto } from './dto/create-incident-log.dto';
import { UpdateIncidentLogDto } from './dto/update-incident-log.dto';
export declare class IncidentLogsService {
    private incidentLogsRepository;
    constructor(incidentLogsRepository: Repository<IncidentLog>);
    create(createIncidentLogDto: CreateIncidentLogDto): Promise<IncidentLog>;
    findAll(): Promise<IncidentLog[]>;
    findOne(id: string): Promise<IncidentLog | null>;
    update(id: string, updateIncidentLogDto: UpdateIncidentLogDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
