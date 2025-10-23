import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class VolunteerDto {
  @ApiProperty({ example: 'I can help with first aid and transportation', required: false })
  @IsString()
  @IsOptional()
  message?: string;

  @ApiProperty({ example: 'First Aid, CPR Certified, Transportation', required: false })
  @IsString()
  @IsOptional()
  skills?: string;
}
