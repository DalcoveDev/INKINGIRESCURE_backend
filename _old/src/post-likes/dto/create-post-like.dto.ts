import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostLikeDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  post_id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;
}