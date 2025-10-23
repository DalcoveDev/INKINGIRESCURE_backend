import { AuditLogsService } from './audit-logs.service';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { UpdateAuditLogDto } from './dto/update-audit-log.dto';
export declare class AuditLogsController {
    private readonly auditLogsService;
    constructor(auditLogsService: AuditLogsService);
    create(createAuditLogDto: CreateAuditLogDto): Promise<import("./entities/audit-log.entity").AuditLog>;
    findAll(): Promise<import("./entities/audit-log.entity").AuditLog[]>;
    findOne(id: string): Promise<import("./entities/audit-log.entity").AuditLog | null>;
    update(id: string, updateAuditLogDto: UpdateAuditLogDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
