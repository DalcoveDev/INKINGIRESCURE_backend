import { PartialType } from '@nestjs/mapped-types';
import { CreateEmergencyReportDto } from './create-emergency-report.dto';

export class UpdateEmergencyReportDto extends PartialType(CreateEmergencyReportDto) {}