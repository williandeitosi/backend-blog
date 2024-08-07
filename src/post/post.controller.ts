import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/Is-public.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import type { Post as PostEntity } from '@prisma/client';

type FormattedPost = Omit<PostEntity, 'created_at'> & { created_at: string };

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @IsPublic()
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ data: PostEntity[]; meta: any }> {
    return await this.postService.findAll(page, limit);
  }
  @IsPublic()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FormattedPost> {
    return await this.postService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return await this.postService.createPost(createPostDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.postService.delete(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async editPost(
    @Param('id') id: string,
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostEntity> {
    return await this.postService.editPost(id, createPostDto);
  }
}
