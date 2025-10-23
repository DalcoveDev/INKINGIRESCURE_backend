import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostComment } from './entities/post-comment.entity';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';

@Injectable()
export class PostCommentsService {
  constructor(
    @InjectRepository(PostComment)
    private postCommentsRepository: Repository<PostComment>,
  ) {}

  create(createPostCommentDto: CreatePostCommentDto) {
    const postComment = this.postCommentsRepository.create(createPostCommentDto);
    return this.postCommentsRepository.save(postComment);
  }

  findAll() {
    return this.postCommentsRepository.find();
  }

  findOne(id: string) {
    return this.postCommentsRepository.findOne({ where: { id } });
  }

  update(id: string, updatePostCommentDto: UpdatePostCommentDto) {
    return this.postCommentsRepository.update(id, updatePostCommentDto);
  }

  remove(id: string) {
    return this.postCommentsRepository.delete(id);
  }
}