import { IsArray, IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEmergencyReportDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  severity: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @IsOptional()
  media: string[];

  @IsDecimal()
  @IsNotEmpty()
  lat: number;

  @IsDecimal()
  @IsNotEmpty()
  lng: number;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsString()
  @IsNotEmpty()
  reported_by: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsArray()
  @IsOptional()
  assigned_to: string[];
}