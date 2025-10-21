import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCommunityPostDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  @IsOptional()
  media: string[];

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsOptional()
  district: string;
}