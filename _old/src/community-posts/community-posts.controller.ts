import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommunityPostsService } from './community-posts.service';
import { CreateCommunityPostDto } from './dto/create-community-post.dto';
import { UpdateCommunityPostDto } from './dto/update-community-post.dto';

@Controller('community-posts')
export class CommunityPostsController {
  constructor(private readonly communityPostsService: CommunityPostsService) {}

  @Post()
  create(@Body() createCommunityPostDto: CreateCommunityPostDto) {
    return this.communityPostsService.create(createCommunityPostDto);
  }

  @Get()
  findAll() {
    return this.communityPostsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.communityPostsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommunityPostDto: UpdateCommunityPostDto) {
    return this.communityPostsService.update(id, updateCommunityPostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.communityPostsService.remove(id);
  }
}