import { PartialType } from '@nestjs/mapped-types';
import { CreateReportStatusHistoryDto } from './create-report-status-history.dto';

export class UpdateReportStatusHistoryDto extends PartialType(CreateReportStatusHistoryDto) {}