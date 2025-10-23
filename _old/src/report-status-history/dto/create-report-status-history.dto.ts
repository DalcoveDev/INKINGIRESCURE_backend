import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReportStatusHistoryDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  report_id: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  changed_by: string;

  @IsString()
  @IsOptional()
  notes: string;
}