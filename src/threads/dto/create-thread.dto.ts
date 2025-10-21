import { IsNotEmpty, IsString } from 'class-validator';

export class CreateThreadDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  report_id: string;

  @IsString()
  @IsNotEmpty()
  organizer: string;
}