import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString, IsOptional } from 'class-validator';

export class AssignResponderDto {
  @ApiProperty({ example: 'uuid-of-responder' })
  @IsString()
  @IsNotEmpty()
  responderId: string;

  @ApiProperty({ example: '2025-10-22T10:45:00.000Z', required: false })
  @IsDateString()
  @IsOptional()
  estimatedArrival?: string;
}
