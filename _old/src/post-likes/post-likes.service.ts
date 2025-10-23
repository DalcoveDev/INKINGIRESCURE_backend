import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostLike } from './entities/post-like.entity';
import { CreatePostLikeDto } from './dto/create-post-like.dto';
import { UpdatePostLikeDto } from './dto/update-post-like.dto';

@Injectable()
export class PostLikesService {
  constructor(
    @InjectRepository(PostLike)
    private postLikesRepository: Repository<PostLike>,
  ) {}

  create(createPostLikeDto: CreatePostLikeDto) {
    const postLike = this.postLikesRepository.create(createPostLikeDto);
    return this.postLikesRepository.save(postLike);
  }

  findAll() {
    return this.postLikesRepository.find();
  }

  findOne(id: string) {
    return this.postLikesRepository.findOne({ where: { id } });
  }

  update(id: string, updatePostLikeDto: UpdatePostLikeDto) {
    return this.postLikesRepository.update(id, updatePostLikeDto);
  }

  remove(id: string) {
    return this.postLikesRepository.delete(id);
  }
}