import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateIncidentLogDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  report_id: string;

  @IsString()
  @IsNotEmpty()
  resolved_by: string;

  @IsInt()
  @IsOptional()
  response_time_min: number;

  @IsString()
  @IsOptional()
  resolution_notes: string;
}