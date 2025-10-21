import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  report_id: string;

  @IsInt()
  @IsNotEmpty()
  rating: number;

  @IsString()
  @IsOptional()
  comment: string;
}