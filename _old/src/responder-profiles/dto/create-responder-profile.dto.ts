import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateResponderProfileDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  specialization: string;

  @IsString()
  @IsOptional()
  badge_number: string;

  @IsString()
  @IsOptional()
  station: string;
}