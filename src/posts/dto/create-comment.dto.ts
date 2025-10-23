import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'Great post! Very helpful information.' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
