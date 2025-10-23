import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmergencyReport } from './entities/emergency-report.entity';
import { CreateEmergencyReportDto } from './dto/create-emergency-report.dto';
import { UpdateEmergencyReportDto } from './dto/update-emergency-report.dto';

@Injectable()
export class EmergencyReportsService {
  constructor(
    @InjectRepository(EmergencyReport)
    private emergencyReportsRepository: Repository<EmergencyReport>,
  ) {}

  create(createEmergencyReportDto: CreateEmergencyReportDto) {
    const emergencyReport = this.emergencyReportsRepository.create(createEmergencyReportDto);
    return this.emergencyReportsRepository.save(emergencyReport);
  }

  findAll() {
    return this.emergencyReportsRepository.find();
  }

  findOne(id: string) {
    return this.emergencyReportsRepository.findOne({ where: { id } });
  }

  update(id: string, updateEmergencyReportDto: UpdateEmergencyReportDto) {
    return this.emergencyReportsRepository.update(id, updateEmergencyReportDto);
  }

  remove(id: string) {
    return this.emergencyReportsRepository.delete(id);
  }
}