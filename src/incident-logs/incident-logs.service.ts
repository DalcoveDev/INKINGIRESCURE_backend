import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IncidentLog } from './entities/incident-log.entity';
import { CreateIncidentLogDto } from './dto/create-incident-log.dto';
import { UpdateIncidentLogDto } from './dto/update-incident-log.dto';

@Injectable()
export class IncidentLogsService {
  constructor(
    @InjectRepository(IncidentLog)
    private incidentLogsRepository: Repository<IncidentLog>,
  ) {}

  create(createIncidentLogDto: CreateIncidentLogDto) {
    const incidentLog = this.incidentLogsRepository.create(createIncidentLogDto);
    return this.incidentLogsRepository.save(incidentLog);
  }

  findAll() {
    return this.incidentLogsRepository.find();
  }

  findOne(id: string) {
    return this.incidentLogsRepository.findOne({ where: { id } });
  }

  update(id: string, updateIncidentLogDto: UpdateIncidentLogDto) {
    return this.incidentLogsRepository.update(id, updateIncidentLogDto);
  }

  remove(id: string) {
    return this.incidentLogsRepository.delete(id);
  }
}