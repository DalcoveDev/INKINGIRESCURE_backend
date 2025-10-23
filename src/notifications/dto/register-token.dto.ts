import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class RegisterTokenDto {
  @ApiProperty({ example: 'ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]' })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({ example: 'ios', required: false, enum: ['ios', 'android'] })
  @IsString()
  @IsOptional()
  deviceType?: string;
}
