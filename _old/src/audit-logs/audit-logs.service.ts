import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { UpdateAuditLogDto } from './dto/update-audit-log.dto';

@Injectable()
export class AuditLogsService {
  constructor(
    @InjectRepository(AuditLog)
    private auditLogsRepository: Repository<AuditLog>,
  ) {}

  create(createAuditLogDto: CreateAuditLogDto) {
    const auditLog = this.auditLogsRepository.create(createAuditLogDto);
    return this.auditLogsRepository.save(auditLog);
  }

  findAll() {
    return this.auditLogsRepository.find();
  }

  findOne(id: string) {
    return this.auditLogsRepository.findOne({ where: { id } });
  }

  update(id: string, updateAuditLogDto: UpdateAuditLogDto) {
    return this.auditLogsRepository.update(id, updateAuditLogDto);
  }

  remove(id: string) {
    return this.auditLogsRepository.delete(id);
  }
}