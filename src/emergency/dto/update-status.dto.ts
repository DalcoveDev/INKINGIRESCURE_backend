import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { EmergencyStatus } from '../../../generated/prisma';

export class UpdateStatusDto {
  @ApiProperty({ enum: EmergencyStatus, example: 'IN_PROGRESS' })
  @IsEnum(EmergencyStatus)
  @IsNotEmpty()
  status: EmergencyStatus;
}
