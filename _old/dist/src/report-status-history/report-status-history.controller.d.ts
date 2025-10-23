import { ReportStatusHistoryService } from './report-status-history.service';
import { CreateReportStatusHistoryDto } from './dto/create-report-status-history.dto';
import { UpdateReportStatusHistoryDto } from './dto/update-report-status-history.dto';
export declare class ReportStatusHistoryController {
    private readonly reportStatusHistoryService;
    constructor(reportStatusHistoryService: ReportStatusHistoryService);
    create(createReportStatusHistoryDto: CreateReportStatusHistoryDto): Promise<import("./entities/report-status-history.entity").ReportStatusHistory>;
    findAll(): Promise<import("./entities/report-status-history.entity").ReportStatusHistory[]>;
    findOne(id: string): Promise<import("./entities/report-status-history.entity").ReportStatusHistory | null>;
    update(id: string, updateReportStatusHistoryDto: UpdateReportStatusHistoryDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
