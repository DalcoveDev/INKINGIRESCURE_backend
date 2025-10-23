import { IncidentLogsService } from './incident-logs.service';
import { CreateIncidentLogDto } from './dto/create-incident-log.dto';
import { UpdateIncidentLogDto } from './dto/update-incident-log.dto';
export declare class IncidentLogsController {
    private readonly incidentLogsService;
    constructor(incidentLogsService: IncidentLogsService);
    create(createIncidentLogDto: CreateIncidentLogDto): Promise<import("./entities/incident-log.entity").IncidentLog>;
    findAll(): Promise<import("./entities/incident-log.entity").IncidentLog[]>;
    findOne(id: string): Promise<import("./entities/incident-log.entity").IncidentLog | null>;
    update(id: string, updateIncidentLogDto: UpdateIncidentLogDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
