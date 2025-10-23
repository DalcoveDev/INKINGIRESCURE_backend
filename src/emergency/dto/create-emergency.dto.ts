import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsNumber, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { EmergencyType, EmergencyPriority } from '../../../generated/prisma';

export class CreateEmergencyDto {
  @ApiProperty({ enum: EmergencyType, example: 'MEDICAL' })
  @IsEnum(EmergencyType)
  @IsNotEmpty()
  type: EmergencyType;

  @ApiProperty({ enum: EmergencyPriority, example: 'HIGH', required: false })
  @IsEnum(EmergencyPriority)
  @IsOptional()
  priority?: EmergencyPriority;

  @ApiProperty({ example: 'Medical Emergency - Heart Attack' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Patient experiencing severe chest pain and difficulty breathing', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: -1.9441, description: 'Latitude coordinate' })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Min(-90)
  @Max(90)
  latitude: number;

  @ApiProperty({ example: 30.0619, description: 'Longitude coordinate' })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Min(-180)
  @Max(180)
  longitude: number;

  @ApiProperty({ example: 'KN 5 Ave, Kigali, Rwanda', required: false })
  @IsString()
  @IsOptional()
  address?: string;
}
