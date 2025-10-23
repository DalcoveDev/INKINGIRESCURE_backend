import { Repository } from 'typeorm';
import { ReportStatusHistory } from './entities/report-status-history.entity';
import { CreateReportStatusHistoryDto } from './dto/create-report-status-history.dto';
import { UpdateReportStatusHistoryDto } from './dto/update-report-status-history.dto';
export declare class ReportStatusHistoryService {
    private reportStatusHistoryRepository;
    constructor(reportStatusHistoryRepository: Repository<ReportStatusHistory>);
    create(createReportStatusHistoryDto: CreateReportStatusHistoryDto): Promise<ReportStatusHistory>;
    findAll(): Promise<ReportStatusHistory[]>;
    findOne(id: string): Promise<ReportStatusHistory | null>;
    update(id: string, updateReportStatusHistoryDto: UpdateReportStatusHistoryDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
