import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { UpdateAuditLogDto } from './dto/update-audit-log.dto';
export declare class AuditLogsService {
    private auditLogsRepository;
    constructor(auditLogsRepository: Repository<AuditLog>);
    create(createAuditLogDto: CreateAuditLogDto): Promise<AuditLog>;
    findAll(): Promise<AuditLog[]>;
    findOne(id: string): Promise<AuditLog | null>;
    update(id: string, updateAuditLogDto: UpdateAuditLogDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
