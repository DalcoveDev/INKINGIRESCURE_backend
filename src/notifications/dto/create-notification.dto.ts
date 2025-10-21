import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  target_district: string;

  @IsArray()
  @IsOptional()
  recipients: string[];

  @IsArray()
  @IsNotEmpty()
  delivery_method: string[];

  @IsString()
  @IsNotEmpty()
  status: string;
}