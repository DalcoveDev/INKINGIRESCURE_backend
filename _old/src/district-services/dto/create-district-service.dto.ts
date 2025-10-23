import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDistrictServiceDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsString()
  @IsOptional()
  police_contact: string;

  @IsString()
  @IsOptional()
  hospital_contact: string;

  @IsString()
  @IsOptional()
  fire_department_contact: string;

  @IsArray()
  @IsOptional()
  other_services: string[];
}