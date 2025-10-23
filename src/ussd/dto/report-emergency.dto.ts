import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, Matches } from 'class-validator';

export class ReportEmergencyUssdDto {
  @ApiProperty({ example: '+250788123456' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Phone number must be a valid international format',
  })
  phoneNumber: string;

  @ApiProperty({ example: 'fire', enum: ['fire', 'medical', 'accident', 'crime', 'other'] })
  @IsString()
  @IsNotEmpty()
  emergencyType: string;

  @ApiProperty({ example: 'INK12345678', required: false })
  @IsString()
  @IsOptional()
  referenceId?: string;

  @ApiProperty({ example: 'Fire emergency reported via USSD' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'Location to be determined', required: false })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({ example: 'pending', required: false })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ example: '2025-10-23T18:59:15.000Z', required: false })
  @IsString()
  @IsOptional()
  reportedAt?: string;
}
