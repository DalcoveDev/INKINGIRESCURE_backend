import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, MinLength, Matches } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'John', required: false })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ example: 'Doe', required: false })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ example: 'john.doe@example.com', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '+250788123456', required: false })
  @IsString()
  @IsOptional()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Phone number must be a valid international format',
  })
  phoneNumber?: string;

  @ApiProperty({ example: '1199780012345678', required: false, description: 'National ID number' })
  @IsString()
  @IsOptional()
  nationalId?: string;

  @ApiProperty({ example: 'KN 5 Ave, Kigali, Rwanda', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ example: -1.9441, required: false, description: 'Latitude coordinate' })
  @IsOptional()
  latitude?: number;

  @ApiProperty({ example: 30.0619, required: false, description: 'Longitude coordinate' })
  @IsOptional()
  longitude?: number;

  @ApiProperty({ example: 'NewPassword123!', required: false })
  @IsString()
  @IsOptional()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password?: string;

  @ApiProperty({ 
    type: 'string', 
    format: 'binary', 
    required: false,
    description: 'Profile image file to upload'
  })
  @IsOptional()
  profileImage?: any;
}
