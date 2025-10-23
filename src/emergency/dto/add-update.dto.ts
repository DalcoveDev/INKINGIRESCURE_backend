import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddUpdateDto {
  @ApiProperty({ example: 'Ambulance is on the way, ETA 10 minutes' })
  @IsString()
  @IsNotEmpty()
  message: string;
}
