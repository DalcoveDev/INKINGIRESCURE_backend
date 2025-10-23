import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'Community Safety Tips' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Here are some important safety tips for our community...' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ 
    type: 'string', 
    format: 'binary', 
    required: false,
    description: 'Image file to upload'
  })
  @IsOptional()
  image?: any;
}
