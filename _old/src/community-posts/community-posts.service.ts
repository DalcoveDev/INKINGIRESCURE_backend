import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommunityPost } from './entities/community-post.entity';
import { CreateCommunityPostDto } from './dto/create-community-post.dto';
import { UpdateCommunityPostDto } from './dto/update-community-post.dto';

@Injectable()
export class CommunityPostsService {
  constructor(
    @InjectRepository(CommunityPost)
    private communityPostsRepository: Repository<CommunityPost>,
  ) {}

  create(createCommunityPostDto: CreateCommunityPostDto) {
    const communityPost = this.communityPostsRepository.create(createCommunityPostDto);
    return this.communityPostsRepository.save(communityPost);
  }

  findAll() {
    return this.communityPostsRepository.find();
  }

  findOne(id: string) {
    return this.communityPostsRepository.findOne({ where: { id } });
  }

  update(id: string, updateCommunityPostDto: UpdateCommunityPostDto) {
    return this.communityPostsRepository.update(id, updateCommunityPostDto);
  }

  remove(id: string) {
    return this.communityPostsRepository.delete(id);
  }
}