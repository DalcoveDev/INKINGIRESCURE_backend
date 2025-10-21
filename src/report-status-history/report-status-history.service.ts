import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportStatusHistory } from './entities/report-status-history.entity';
import { CreateReportStatusHistoryDto } from './dto/create-report-status-history.dto';
import { UpdateReportStatusHistoryDto } from './dto/update-report-status-history.dto';

@Injectable()
export class ReportStatusHistoryService {
  constructor(
    @InjectRepository(ReportStatusHistory)
    private reportStatusHistoryRepository: Repository<ReportStatusHistory>,
  ) {}

  create(createReportStatusHistoryDto: CreateReportStatusHistoryDto) {
    const reportStatusHistory = this.reportStatusHistoryRepository.create(createReportStatusHistoryDto);
    return this.reportStatusHistoryRepository.save(reportStatusHistory);
  }

  findAll() {
    return this.reportStatusHistoryRepository.find();
  }

  findOne(id: string) {
    return this.reportStatusHistoryRepository.findOne({ where: { id } });
  }

  update(id: string, updateReportStatusHistoryDto: UpdateReportStatusHistoryDto) {
    return this.reportStatusHistoryRepository.update(id, updateReportStatusHistoryDto);
  }

  remove(id: string) {
    return this.reportStatusHistoryRepository.delete(id);
  }
}