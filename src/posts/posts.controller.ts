import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto, CreateCommentDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CurrentUser, Public } from '../auth/decorators';
import { UserRole } from '../../generated/prisma';

@ApiTags('Posts')
@Controller('posts')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a new community post with optional image' })
  @ApiResponse({ status: 201, description: 'Post created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(
    @CurrentUser() user: any,
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    console.log('Received post data:', createPostDto);
    console.log('Received image:', image ? `${image.originalname} (${image.size} bytes)` : 'No image');
    return this.postsService.create(user.id, createPostDto, image);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiQuery({ name: 'userId', required: false })
  @ApiResponse({ status: 200, description: 'Posts retrieved successfully' })
  findAll(@Query('userId') userId?: string) {
    return this.postsService.findAll({ userId });
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get post by ID with comments and likes' })
  @ApiResponse({ status: 200, description: 'Post retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update post' })
  @ApiResponse({ status: 200, description: 'Post updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Can only update own posts' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  update(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, user.id, user.role, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete post' })
  @ApiResponse({ status: 200, description: 'Post deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Can only delete own posts' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.postsService.remove(id, user.id, user.role);
  }

  // Comments
  @Post(':id/comments')
  @ApiOperation({ summary: 'Add comment to post' })
  @ApiResponse({ status: 201, description: 'Comment added successfully' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  addComment(
    @Param('id') postId: string,
    @CurrentUser() user: any,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.postsService.addComment(postId, user.id, createCommentDto);
  }

  @Public()
  @Get(':id/comments')
  @ApiOperation({ summary: 'Get all comments for a post' })
  @ApiResponse({ status: 200, description: 'Comments retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  getComments(@Param('id') postId: string) {
    return this.postsService.getComments(postId);
  }

  @Delete('comments/:commentId')
  @ApiOperation({ summary: 'Delete comment' })
  @ApiResponse({ status: 200, description: 'Comment deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Can only delete own comments' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  deleteComment(@Param('commentId') commentId: string, @CurrentUser() user: any) {
    return this.postsService.deleteComment(commentId, user.id, user.role);
  }

  // Likes
  @Post(':id/like')
  @ApiOperation({ summary: 'Toggle like on post (like/unlike)' })
  @ApiResponse({ status: 200, description: 'Like toggled successfully' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  toggleLike(@Param('id') postId: string, @CurrentUser() user: any) {
    return this.postsService.toggleLike(postId, user.id);
  }

  @Public()
  @Get(':id/likes')
  @ApiOperation({ summary: 'Get all likes for a post' })
  @ApiResponse({ status: 200, description: 'Likes retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  getLikes(@Param('id') postId: string) {
    return this.postsService.getLikes(postId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all posts by a specific user' })
  @ApiResponse({ status: 200, description: 'User posts retrieved successfully' })
  getUserPosts(@Param('userId') userId: string) {
    return this.postsService.getUserPosts(userId);
  }
}
