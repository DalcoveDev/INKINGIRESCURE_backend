import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, Matches } from 'class-validator';

export class DistressAlertDto {
  @ApiProperty({ example: '+250788123456' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Phone number must be a valid international format',
  })
  phoneNumber: string;

  @ApiProperty({ example: 'Urgent help needed!', required: false })
  @IsString()
  @IsOptional()
  message?: string;

  @ApiProperty({ example: 'Location to be determined', required: false })
  @IsString()
  @IsOptional()
  location?: string;
}
